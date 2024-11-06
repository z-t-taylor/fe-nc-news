import { useContext, useState } from "react"
import { postCommentByArticleId } from "../api"
import { UserContext } from "../contexts/userContext"

const PostComment = ({article_id, setComments}) => {
    const [postComment, setPostComment] = useState("")
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const {user} = useContext(UserContext)

    const handleCommentInput = (event) => {
        setPostComment(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        
        const newCommentInput = {
            author: user.username,
            body: postComment,
            created_at: new Date().toISOString(),
            votes: 0,
        }

        setIsLoading(true)
        setTimeout(() => {
            postCommentByArticleId(article_id, newCommentInput)
            .then(() => {
                setComments((currComments) => [newCommentInput, ...currComments])
                setPostComment("")
                setIsLoading(false)
            })
            .catch((err) => {
                setIsError(true)
                setTimeout(() => {
                    setIsError(false)
                    setPostComment("")
                }, 3000)
                setIsLoading(false)
            }) 
        }, 1000);
    }

    if(isError){
        return<p>Comment not submitted</p>
    }

    return (
        <div>
            <form className='comment_form' onSubmit={handleSubmit}>
                <label htmlFor="comment_input">Have your say:</label>
                <div></div>
                <textarea
                maxLength="800" 
                placeholder='Enter your comment here..'
                id='comment_input'
                onChange={handleCommentInput}
                value={postComment}
                required
                />
                <div></div>
                <button id='comment_btn' type="submit" disabled={isLoading}>{isLoading ? "submitting..." : "submit"}</button>
            </form>
        </div>
    )
}

export default PostComment
