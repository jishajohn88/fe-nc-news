import { useState } from "react";
import {
  updateArticleByDecrementVotes,
  updateArticleByIncrementVotes,
} from "../../api";
import ErrorComponent from "./ErrorComponent";
const VoteHandler = (props) => {
  const { singleArticle } = props;

  const [countVotes, setCountVotes] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error,setError] = useState(null)

  function handleIncrementVotes() {
    setCountVotes((currVotes) => {
      return currVotes + 1;
    });
    updateArticleByIncrementVotes(singleArticle.article_id)
      .then(() => {
        setIsSuccess(true);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
        setError(err)
        setIsSuccess(false);
        setCountVotes((currVotes) => {
          return currVotes - 1;
        });
      });
  }

  function handleDecrementVotes() {
    setCountVotes((currVotes) => {
      return currVotes - 1;
    });

    updateArticleByDecrementVotes(singleArticle.article_id)
      .then(() => {
        setIsSuccess(true);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
        setError(err)
        setIsSuccess(false);
        setCountVotes((currVotes) => {
          return currVotes + 1;
        });
      });
  }
  if(error){
    return <ErrorComponent message={error.message}/>
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
      {isError ? <p class="vote-unsuccess">Vote is unsuccessful</p> : null}
      {isSuccess ? <p class="vote-success">Vote is successful</p> : null}
    </>
  );
};

export default VoteHandler;
