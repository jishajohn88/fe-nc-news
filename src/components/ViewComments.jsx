import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import Expandable from "./Expandable";
import CommentCard from "./CommentCard";
import { getCommentsByArticleId } from "../../api";
import ErrorComponent from "./ErrorComponent";
import Login from "./Login";
import Loading from "./Loading";
import CommentsSection from "./CommentSection";
import { useNavigate } from "react-router-dom";

const ViewComments = (props) => {
  const { article_id } = props;
  const [error, setError] = useState(null);
  const { isLoggedIn } = useContext(UserContext);
  const [isShowing, setisShowing] = useState(false);
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();
  function handleViewComments(event) {
    event.preventDefault();
    setisShowing(!isShowing);
    getCommentsByArticleId(article_id)
      .then((comments) => {
        setComments(comments);
      })
      .catch((err) => {
        setError(err);
      });
  }

  function handlePostComment() {
    navigate("/login");
  }

  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  return (
    <>
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
        <CommentsSection
          comments={comments}
          setComments={setComments}
          article_id={article_id}
        />
      </Expandable>
    </>
  );
};

export default ViewComments;
