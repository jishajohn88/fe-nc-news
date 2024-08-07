import { useState } from "react";
import {
  updateArticleByDecrementVotes,
  updateArticleByIncrementVotes,
} from "../../api";
const VoteHandler = (props) => {
  const { singleArticle } = props;

  const [countVotes, setCountVotes] = useState(0);

  function handleIncrementVotes() {
    setCountVotes((currVotes) => {
      return currVotes + 1;
    });
    updateArticleByIncrementVotes(singleArticle.article_id).catch(() => {
      setCountVotes((currVotes) => {
        return currVotes - 1;
      });
    });
  }

  function handleDecrementVotes() {
    setCountVotes((currVotes) => {
      return currVotes - 1;
    });

    updateArticleByDecrementVotes(singleArticle.article_id).catch(() => {
      setCountVotes((currVotes) => {
        return currVotes + 1;
      });
    });
  }
  return (
    <>
      <button className="up-arrow" onClick={handleIncrementVotes}>
        {String.fromCharCode(8593)}
      </button>{" "}
      {singleArticle.votes + countVotes} Votes
      <button
        className="down-arrow"
        onClick={handleDecrementVotes}
        disabled={singleArticle.votes + countVotes === 0}
      >
        {String.fromCharCode(8595)}
      </button>
    </>
  );
};

export default VoteHandler;
