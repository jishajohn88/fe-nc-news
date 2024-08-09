import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";
const ArticleList = (props) => {
  const { article } = props;

  return (
    <>
     <ArticleCard article={article}/>
     </>
  );
};

export default ArticleList;
