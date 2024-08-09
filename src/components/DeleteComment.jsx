import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { deleteCommentById } from "../../api";

const DeleteComment = (props) => {
  const {
    comment,
    setdeleteMsg,
    isDeleted,
    deleteMsg,
    setComments,
    comments,
  } = props;

  const { loggedInUser } = useContext(UserContext);
  const [currentId,setCurrentId] = useState(null)
  function handleClick(event) {
    event.preventDefault();
    setCurrentId(comment.comment_id)
    deleteCommentById(comment.comment_id)
      .then((response) => {
        setdeleteMsg("Deleting comment !!!");
        setTimeout(() => {
          setComments((currComment) => {
            return currComment.filter((commentObject) => commentObject.comment_id !== comment.comment_id )
          })
        },1000)
       
      })
      .catch((err) => {
        setdeleteMsg("Error deleting comment")
      });
  }
  if(comment.author === loggedInUser.username){
    return (
      <>
      <p>{currentId === comment.comment_id ? deleteMsg : null}</p>
      <button className="delete-comment" onClick={handleClick}>
          Delete my comment
        </button>
      </>
    )
  }
};

export default DeleteComment;
