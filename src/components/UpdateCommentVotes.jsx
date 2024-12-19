import { useState } from "react";
import { patchCommentByCommentId } from "../api";

const UpdateCommentVotes = ({ commentId, initialVotes }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [voteStatus, setVoteStatus] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleVote = (voteType) => {
    let voteChange = 0;

    if (voteType === "upvote") {
      if (voteStatus === "upvoted") {
        voteChange = -1;
        setVoteStatus(null);
      } else if (voteStatus === null) {
        voteChange = 1;
        setVoteStatus("upvoted");
      }
    } else if (voteType === "downvote") {
      if (voteStatus === "downvoted") {
        voteChange = 1;
        setVoteStatus(null);
      } else if (voteStatus === null) {
        voteChange = -1;
        setVoteStatus("downvoted");
      }
    }

    setVotes((currVotes) => currVotes + voteChange);
    setIsError(false);

    patchCommentByCommentId(commentId, voteChange).catch((err) => {
      setVotes((currVotes) => currVotes - voteChange);
      setVoteStatus((prevStatus) => prevStatus);
      setIsError(true);
    });
  };

  if (isError) {
    return (
      <div>
        <p className="inline_error_and_loading">Error, cannot update votes</p>
      </div>
    );
  }

  return (
    <div className="vote_change">
      <button
        aria-label="up vote button"
        id="upVote"
        onClick={() => handleVote("upvote")}
        style={{
          color:
            voteStatus === "upvoted" ? "rgb(100, 17, 3)" : "rgb(202, 30, 0)",
        }}
      >
        v
      </button>
      <p id="vote_count">
        Votes: <span>{votes}</span>
      </p>
      <button
        aria-label="down vote button"
        id="downVote"
        onClick={() => handleVote("downvote")}
        style={{
          color:
            voteStatus === "downvoted" ? "rgb(100, 17, 3)" : "rgb(202, 30, 0)",
        }}
      >
        v
      </button>
    </div>
  );
};

export default UpdateCommentVotes;
