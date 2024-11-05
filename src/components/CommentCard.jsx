import { dateFormat } from "../utils"

const CommentCard = ({comment}) => {
    const formattedDate = dateFormat(comment.created_at)
    return (
        <div className="comment_card">
            <div id="comments_header_wrap">
                <p id="comment_user">{comment.author}</p>
                <p id="comment_date">Posted: {formattedDate}</p>
            </div>
            <p id="comment_body">{comment.body}</p>
            <p className="votes">Votes: {comment.votes}</p>
        </div>
    )
}

export default CommentCard
