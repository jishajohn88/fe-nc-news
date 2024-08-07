import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "../../api";
import Loading from "./Loading";
import moment from "moment";
import ScrollToTop from "react-scroll-to-top";
import CommentCard from "./CommentCard";
import Expandable from "./Expandable";
import VoteHandler from "./VoteHandler";

const SingleArticle = () => {
  const [singleArticle, setSingleArticle] = useState({});
  const { article_id } = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [isShowing, setisShowing] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setisLoading(true);
    getArticleById(article_id).then((article) => {
      setSingleArticle(article);
      setisLoading(false);
    });
  }, [article_id]);

  function handleViewComments(event) {
    event.preventDefault();
    setisShowing(!isShowing);
    setisLoading(true);
    getCommentsByArticleId(article_id).then((comments) => {
      setComments(comments);
      setisLoading(false);
    });
  }

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <section className="single-article">
          <article className="single-article-heading">
            <h2>{singleArticle.title}</h2>
            <img src={singleArticle.article_img_url} />
          </article>
          <article className="single-article-additional-info">
            <h3>
              Created on :{" "}
              {moment(singleArticle.created_at).format("MMMM Do YYYY")}
            </h3>
            <h4 className="single-article-topic">{singleArticle.topic}</h4>
            <p>{singleArticle.body}</p>
            <h5>
              <VoteHandler singleArticle={singleArticle} />
            </h5>
            <h5>Comments : {singleArticle.comment_count}</h5>
          </article>
          <article className="single-article-buttons">
            <button className="view-comments" onClick={handleViewComments}>
              {isShowing ? "Hide" : "View"} Comments
            </button>
            <button className="post-comment">
              Post comment to the article
            </button>
          </article>
          <Expandable isShowing={isShowing}>
            <section className="comments-container">
              {comments.map((comment) => {
                return (
                  <CommentCard key={comment.comment_id} comment={comment} />
                );
              })}
            </section>
          </Expandable>
          <ScrollToTop smooth />
        </section>
      </>
    );
  }
};

export default SingleArticle;
