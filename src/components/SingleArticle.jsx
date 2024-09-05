import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../api";
import Loading from "./Loading";
import ScrollToTop from "react-scroll-to-top";
import ErrorComponent from "./ErrorComponent";
import ArticleCard from "./ArticleCard";
import ViewComments from "./ViewComments";
import Header from "./Header";

const SingleArticle = () => {
  const [singleArticle, setSingleArticle] = useState({});
  const { article_id } = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setisLoading(true);
    getArticleById(article_id)
      .then((article) => {
        setSingleArticle(article);
        setisLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [article_id]);

  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <Header />
        <section className="single-article">
          <ArticleCard singleArticle={singleArticle} />
          <ViewComments article_id={article_id} />
          <ScrollToTop smooth />
        </section>
      </>
    );
  }
};

export default SingleArticle;
