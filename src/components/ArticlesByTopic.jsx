import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticlesByTopic } from "../../api";
import Loading from "./Loading";
import SingleArticle from "./SingleArticle";
import LoggedOut from "./LoggedOut";
import Homepage from "./Homepage";
import ArticleList from "./ArticleList";

const ArticlesByTopic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const topicNameQuery = searchParams.get("topic");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getArticlesByTopic(topicNameQuery).then((data) => {
      setIsLoading(false);
      setArticles(data);
    });
  }, [topicNameQuery]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <section className="article-list">
          {articles.map((article) => {
            return <ArticleList key={article.article_id} article={article}/>
          })}
    
        </section>
      </>
    );
  }
};
export default ArticlesByTopic;
