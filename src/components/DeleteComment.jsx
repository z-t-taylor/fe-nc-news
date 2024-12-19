import { useState } from "react";
import { deleteCommentByCommentId } from "../api";

const DeleteComment = ({ comment, comments, setComments }) => {
  const [isDeleteComment, setIsDeleteComment] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleDelete = () => {
    setIsDeleteComment(true);
    deleteCommentByCommentId(comment.comment_id)
      .then(() => {
        const newComments = comments.filter(
          (currComment) => currComment !== comment
        );
        setComments(newComments);
        setIsDeleteComment(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
      });
    setIsDeleteComment(false);
  };

  if (isError) {
    return <div>Sorry, could not delete comment</div>;
  }

  return (
    <div className="delete_wrap">
      <button
        className="delete_btn"
        onClick={handleDelete}
        disabled={isDeleteComment}
      >
        {isDeleteComment ? "Deleting.." : "Delete"}
      </button>
    </div>
  );
};

export default DeleteComment;
