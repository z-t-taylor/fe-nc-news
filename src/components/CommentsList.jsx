import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getComments } from '../api'
import CommentCard from './CommentCard'

const CommentsList = () => {
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
        <section className='comments_section_wrap'>
            <h3>Comments:</h3>
            <div>
                {comments.map((comment) => {
                    return <CommentCard key={comment.comment_id} comment={comment}/>
                })}
            </div>
            
        </section>
    )
}

export default CommentsList
