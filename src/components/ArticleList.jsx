import { Link } from "react-router-dom";
import moment from "moment";
const ArticleList = (props) => {
  const { articles } = props;

  return (
    <>
    <section className="article-list">
    {articles.map((article) => {
      return (
      <section className="article-card" key={article.article_id}>
       <Link to={`/articles/${article.article_id}`}>
           <img src={article.article_img_url} />
           <h3>{article.title}</h3>
           <h4>{moment(article.created_at).format("ll")}</h4>
           <h4>Votes : {article.votes}</h4>
           <h4>Comment_Count : {article.comment_count}</h4>
         </Link>
        </section>
      )
          
    })}

    </section>
     
     </>
  );
};

export default ArticleList;
