import moment from "moment";
import DeleteComment from "./DeleteComment";

const CommentCard = (props) => {
  const { comment, setComments } = props;

  return (
    <>
      <section className="comments-list">
        <h3>{comment.body}</h3>
        <h4 className="comment-card-author">{comment.author}</h4>
        <h5>{moment(comment.created_at).format("MMMM Do YYYY")}</h5>

        <DeleteComment comment={comment} setComments={setComments} />
      </section>
    </>
  );
};

export default CommentCard;
