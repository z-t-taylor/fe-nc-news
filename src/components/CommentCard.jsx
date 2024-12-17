import { dateFormat } from "../utils";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import DeleteComment from "./DeleteComment";
import UpdateCommentVotes from "./UpdateCommentVotes";

const CommentCard = ({ comment, comments, setComments }) => {
  const { user } = useContext(UserContext);

  const formattedDate = dateFormat(comment.created_at);
  return (
    <div className="comment_card">
      <div id="comments_header_wrap">
        <p id="comment_user">{comment.author}</p>
        <p id="comment_date">Posted: {formattedDate}</p>
      </div>
      <p id="comment_body">{comment.body}</p>
      <p className="votes">
        {" "}
        {
          <UpdateCommentVotes
            commentId={comment._id}
            initialVotes={comment.votes}
          />
        }
      </p>

      {comment.author === user.username ? (
        <DeleteComment
          comment={comment}
          comments={comments}
          setComments={setComments}
        />
      ) : null}
    </div>
  );
};

export default CommentCard;
