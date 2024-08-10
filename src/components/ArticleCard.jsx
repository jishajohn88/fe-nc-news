import moment from "moment";
import VoteHandler from "./VoteHandler";
const ArticleCard = (props) => {
  const { singleArticle } = props;
  return (
    <>
      <article className="single-article-heading">
        <h2>{singleArticle.title}</h2>
        <img src={singleArticle.article_img_url} />
      </article>
      <article className="single-article-additional-info">
        <h3>
          Created on : {moment(singleArticle.created_at).format("MMMM Do YYYY")}
        </h3>
        <h4 className="single-article-topic">{singleArticle.topic}</h4>
        <p>{singleArticle.body}</p>
        <h5>
          <VoteHandler singleArticle={singleArticle} />
        </h5>
        <h5>Comments : {singleArticle.comment_count}</h5>
      </article>
    </>
  );
};

export default ArticleCard;
