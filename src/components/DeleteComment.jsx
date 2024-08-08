import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { deleteCommentById } from "../../api";

const DeleteComment = (props) => {
  const { comment, setIsDeleted, setdeleteMsg, isDeleted, deleteMsg } = props;
  const { loggedInUser } = useContext(UserContext);
  function handleClick(event) {
    event.preventDefault();
    setIsDeleted(true);

    deleteCommentById(comment.comment_id).then((response) => {
      setdeleteMsg("Comment has been deleted !!!");
    });
  }
  return (
    <>
      {comment.author === loggedInUser.username ? (
        <button className="delete-comment" onClick={handleClick}>
          Delete my comment
        </button>
      ) : null}
    </>
  );
};

export default DeleteComment;
