import { useContext, useState } from "react";
import { postComment } from "../../api";
import ViewComments from "./ViewComments";
import { UserContext } from "../contexts/User";
import ErrorComponent from "./ErrorComponent";

const PostComment = (props) => {
  const { article_id, isPosted, setIsPosted, comments, setComments } = props;
  const [commentBody, setCommentBody] = useState("");
  const { loggedInUser} = useContext(UserContext);
  const [error, setError] = useState(null);
  const [newComments, setNewComments] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const newComment = {
      username: loggedInUser.username,
      body: commentBody,
    };
    postComment(newComment, article_id)
      .then((response) => {
        setIsPosted(!isPosted);
        setComments((currComments) => {
          return [response, ...currComments];
        });
      })
      .catch((err) => {
        setError(err);
      });
    setCommentBody("");
  }

  function handleChangeCommentBody(event) {
    setCommentBody(event.target.value);
  }
  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  return (
    <>
      <section className="post-section">
        <form className="post-form">
          <img className="avatar-img" src={loggedInUser.avatar_url} />
          <textarea
            id="comment-body"
            name="comment-body"
            rows="4"
            cols="10"
            onChange={handleChangeCommentBody}
            value={commentBody}
            placeholder="Write something here..."
          ></textarea>
          <button onClick={handleSubmit}>Post</button>
        </form>
      </section>
    </>
  );
};

export default PostComment;
