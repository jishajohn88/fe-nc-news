import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import Expandable from "./Expandable";
import CommentCard from "./CommentCard";
import { getCommentsByArticleId } from "../../api";

const ViewComments = (props) => {
  const { userNameInput, articleId } = props;

  const { loggedInUser } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [isShowing, setIsShowing] = useState(true);

  function handleViewMyComments() {
    getCommentsByArticleId(articleId).then((comments) => {
      setComments(comments);
    });
  }

  return (
    <>
      <button onClick={handleViewMyComments}>View my comments</button>
      <Expandable isShowing={isShowing}>
        <section className="comments-container">
          {comments.map((comment) => {
            return comment.author === loggedInUser.username ? (
              <CommentCard key={comment.comment_id} comment={comment} />
            ) : null;
          })}
        </section>
      </Expandable>
    </>
  );
};

export default ViewComments;
