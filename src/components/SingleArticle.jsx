import { useContext, useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "../../api";
import Loading from "./Loading";
import moment from "moment";
import ScrollToTop from "react-scroll-to-top";
import CommentCard from "./CommentCard";
import Expandable from "./Expandable";
import VoteHandler from "./VoteHandler";
import Login from "./Login";
import PostComment from "./PostComment";
import { UserContext } from "../contexts/User";
import ErrorComponent from "./ErrorComponent";

const SingleArticle = (props) => {
  const {isLoggingIn,setIsLogginIn} = props
  const [singleArticle, setSingleArticle] = useState({});
  const { article_id } = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [isShowing, setisShowing] = useState(false);
  const [comments, setComments] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const { loggedInUser, isLoggedIn, setLoggedInUser } = useContext(UserContext);
  const [isPost, setIsPost] = useState(false);
  const [deleteMsg, setdeleteMsg] = useState("");
  const [isPosted, setIsPosted] = useState(false);
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

  function handleViewComments(event) {
    event.preventDefault();
    setisShowing(!isShowing);
    setisLoading(true);
    getCommentsByArticleId(article_id)
      .then((comments) => {
        setComments(comments);
        setisLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }
  function handlePostComment() {
    setIsPost(true);
  }
  if (error) {
    return <ErrorComponent message={error.message} />;
  }
  if (isPost) {
    return <Login article_id={article_id} />;
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
            {!isLoggedIn ? (
              <button className="post-comment" onClick={handlePostComment}>
                Add a comment
              </button>
            ) : null}
          </article>
          <Expandable isShowing={isShowing}>
            <section className="comments-container">
            {isLoggedIn ? (
            <PostComment
              loggedInUser={loggedInUser}
              article_id={article_id}
              isPosted={isPosted}
              setIsPosted={setIsPosted}
              comments={comments}
              setComments={setComments}
            />
          ) : null}
              {comments.map((comment) => {
                return (
                  <CommentCard
                    key={comment.comment_id}
                    comment={comment}
                    setComments={setComments}
                    setIsDeleted={setIsDeleted}
                    comments={comments}
                    deleteMsg={deleteMsg}
                    isDeleted={isDeleted}
                    setdeleteMsg={setdeleteMsg}
                  />
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
