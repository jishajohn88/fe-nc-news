import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import CommentCard from "./CommentCard";
import PostComment from "./PostComment";

const CommentsSection = (props) => {
  const { comments, setComments, article_id } = props;
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      <section className="comments-container">
        {isLoggedIn ? (
          <PostComment article_id={article_id} setComments={setComments} />
        ) : null}
        {comments.map((comment) => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              setComments={setComments}
            />
          );
        })}
      </section>
    </>
  );
};

export default CommentsSection;
