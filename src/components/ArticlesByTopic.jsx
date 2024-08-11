import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticlesByTopic } from "../../api";
import Loading from "./Loading";
import ArticleList from "./ArticleList";
import ErrorComponent from "./ErrorComponent";

const ArticlesByTopic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const topicNameQuery = searchParams.get("topic");
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticlesByTopic(topicNameQuery)
      .then((data) => {
        setIsLoading(false);
        setArticles(data);
      })
      .catch((err) => {
        setError(err);
      });
  }, [topicNameQuery]);

  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <section className="article-list">
          <ArticleList articles={articles} />
        </section>
      </>
    );
  }
};
export default ArticlesByTopic;
