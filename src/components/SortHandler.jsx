import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticles } from "../../api";
import ErrorComponent from "./ErrorComponent";
import ArticleList from "./ArticleList";
import Loading from "./Loading";
import Footer from "./Footer";

const SortHandler = () => {
  const [isLoading, setisLoading] = useState(true);
  const [sortSelect, setSortSelect] = useState("created_at");
  const [orderSelect, setOrderSelect] = useState("asc");
  const [sortArticles, setSortArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchParamsForOrder, setSearchParamsForOrder] = useSearchParams();
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(null);

  const handleSortSelectchange = (e) => {
    const sortValue = e.target.value;
    setSearchParams({ sort_by: sortValue });
    setSortSelect(sortValue);
  };

  const handleOrderSelectChange = (e) => {
    const orderValue = e.target.value;
    setSearchParamsForOrder({ order: orderValue });
    setOrderSelect(orderValue);
  };

  const query = searchParams.get("sort_by");
  const orderQuery = searchParamsForOrder.get("order");
  useEffect(() => {
    setisLoading(true);
    getArticles(query, orderQuery)
      .then((data) => {
        setSortArticles(data.articles);
        setTotalCount(data.total_count);
        setisLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [query, orderQuery]);

  console.log(query, orderQuery);
  if (error) {
    return <ErrorComponent message={error.message} />;
  }
  function handleSubmit(e) {
    e.preventDefault();
  }
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <form className="sort-form" onSubmit={handleSubmit}>
          <select
            id="sort-select"
            value={sortSelect}
            onChange={handleSortSelectchange}
          >
            <option value="created_at">Date</option>
            <option value="comment_count">Comment_Count</option>
            <option value="votes">Votes</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
          <select
            id="order-select"
            value={orderSelect}
            onChange={handleOrderSelectChange}
          >
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </form>
        <section className="article-list">
          {sortArticles.map((article) => {
            return <ArticleList key={article.article_id} article={article} />;
          })}
        </section>
        <Footer
          totalCount={totalCount}
          setSortArticles={setSortArticles}
          query={query}
          orderQuery={orderQuery}
        />
      </>
    );
  }
};

export default SortHandler;
