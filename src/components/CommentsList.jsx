import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../api";
import CommentCard from "./CommentCard";
import PostComment from "./PostComment";
import { UserContext } from "../contexts/userContext";

const CommentsList = () => {
  const { isSignedIn } = useContext(UserContext);
  const { article_id } = useParams();

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getComments(article_id)
      .then((commentData) => {
        setComments(commentData);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return (
      <div>
        <p className="inline_error_and_loading">Loading..</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p className="inline_error_and_loading">Comment not found</p>
      </div>
    );
  }
  return (
    <div>
      <p className="comment_count">
        Comments: <span>{comments.length}</span>
      </p>
      <div id="comments_section_border">
        <section className="comments_section_wrap">
          <h3>Comments:</h3>
          {!isSignedIn ? (
            "Sign in to post a comment"
          ) : (
            <PostComment article_id={article_id} setComments={setComments} />
          )}
          <div>
            {comments.map((comment) => {
              return (
                <CommentCard
                  key={comment.comment_id}
                  comment={comment}
                  comments={comments}
                  setComments={setComments}
                />
              );
            })}
          </div>
        </section>
        <div className="bottom_border"></div>
      </div>
    </div>
  );
};

export default CommentsList;
