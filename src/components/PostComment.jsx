import { useState } from "react";
import { postComment } from "../../api";
import ViewComments from "./ViewComments";

const PostComment = (props) => {
  const { userNameInput, articleId } = props;
  const [commentBody, setCommentBody] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const newComment = {
      username: userNameInput,
      body: commentBody,
    };
    postComment(newComment, articleId).then(() => {
      setIsSuccess(true);
    });
    setCommentBody("");
  }
  function handleChangeCommentBody(event) {
    setCommentBody(event.target.value);
  }
  return (
    <>
      <h2>Fill in your comments!!</h2>
      <form className="post-form">
        <label htmlFor="user-name">Username</label>
        <input
          type="text"
          name="user-name"
          id="user-name"
          value={userNameInput}
          disabled
        ></input>
        <label htmlFor="comment-body">Comments</label>
        <textarea
          id="comment-body"
          name="comment-body"
          rows="4"
          cols="50"
          onChange={handleChangeCommentBody}
          value={commentBody}
        ></textarea>
        <button onClick={handleSubmit}>Post my comment</button>
      </form>
      {isSuccess ? (
        <p className="comment-success">Comment has been posted !!!</p>
      ) : null}

      <ViewComments userNameInput={userNameInput} articleId={articleId} />
    </>
  );
};

export default PostComment;
