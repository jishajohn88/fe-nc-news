import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import Expandable from "./Expandable";
import CommentCard from "./CommentCard";
import { getCommentsByArticleId } from "../../api";
import ErrorComponent from "./ErrorComponent";

const ViewComments = (props) => {
  const { userNameInput, articleId } = props;
  const [error,setError] = useState(null)
  const { loggedInUser } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [isShowing, setIsShowing] = useState(true);
  const [commentId,setCommentId] = useState([])

  function handleViewMyComments() {
    getCommentsByArticleId(articleId).then((comments) => {
      setComments(comments);
    }).catch((err)=>{
      setError(err)
    });
  }

  if(error){
    return <ErrorComponent message={error.message}/>
  }
  return (
    <>
      <button onClick={handleViewMyComments}>View my comments</button>
      <Expandable isShowing={isShowing}>
        <section className="comments-container">
          {comments.map((comment) => {
            return comment.author === loggedInUser.username ? (
              <CommentCard key={comment.comment_id} comment={comment} commentId={commentId} setCommentId={setCommentId}/>
            ) : null;
          })}
        </section>
      </Expandable>
    </>
  );
};

export default ViewComments;
