import {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { getComments } from '../api'
import CommentCard from './CommentCard'
import PostComment from './PostComment'
import { UserContext } from '../contexts/userContext'

const CommentsList = () => {
    const {isSignedIn} = useContext(UserContext)
    const {article_id} = useParams()

    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setIsLoading(true)

        getComments(article_id)
        .then((commentData) => {
            setComments(commentData)
            setIsLoading(false)
            setIsError(false)
        })
        .catch((err) => {
            setIsError(true)
            setIsLoading(false)
        })
    },[article_id])

    if(isLoading){
        return<p>Loading..</p>
    }
    
    if(isError){
        return<p>Comment not found</p>
    }
    return (
        <div id='comments_section_border'>
        <section className='comments_section_wrap'>
            <h3>Comments:</h3>
            {!isSignedIn ? "Sign in to post a comment": <PostComment key={comments.comment_id} article_id={article_id} setComments={setComments}/>}
            <div>
                {comments.map((comment, index) => {
                    return <CommentCard key={comment.comment_id || index} comment={comment}/>
                })}
            </div>
        </section>
        <div className='bottom_border'></div>
        </div>
    )
}

export default CommentsList
