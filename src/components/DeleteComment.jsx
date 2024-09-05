import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { deleteCommentById } from "../../api";

const DeleteComment = (props) => {
  const { comment, setComments } = props;

  const [deleteMessage, setDeleteMessage] = useState("");
  const { loggedInUser } = useContext(UserContext);
  const [currentId, setCurrentId] = useState(null);
  function handleClick(event) {
    event.preventDefault();
    setCurrentId(comment.comment_id);
    deleteCommentById(comment.comment_id)
      .then(() => {
        setDeleteMessage("Deleting comment !!!");
        setTimeout(() => {
          setComments((currComment) => {
            return currComment.filter(
              (commentObject) => commentObject.comment_id !== comment.comment_id
            );
          });
        }, 1000);
      })
      .catch((err) => {
        setDeleteMessage("Error deleting comment");
      });
  }
  if (comment.author === loggedInUser.username) {
    return (
      <>
        <p>{currentId === comment.comment_id ? deleteMessage : null}</p>
        <button className="delete-comment" onClick={handleClick}>
          Delete my comment
        </button>
      </>
    );
  }
};

export default DeleteComment;
