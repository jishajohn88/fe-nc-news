import { useEffect, useState } from "react";
import { getArticlesByCreateDate } from "../../api";
import Loading from "./Loading";
import ArticleCard from "./ArticleCard";

const Homepage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getArticlesByCreateDate().then((article) => {
      setArticles(article);
      setisLoading(false);
    });
  }, []);
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <section className="article-list">
          {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </section>
      </>
    );
  }
};

export default Homepage;
