import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "../../api";
import Loading from "./Loading";
import ScrollToTop from "react-scroll-to-top";
import Expandable from "./Expandable";
import Login from "./Login";
import { UserContext } from "../contexts/User";
import ErrorComponent from "./ErrorComponent";
import CommentsSection from "./CommentSection";
import ArticleCard from "./ArticleCard";
import ViewComments from "./ViewComments";

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
