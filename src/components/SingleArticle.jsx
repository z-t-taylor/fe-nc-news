import {useState, useEffect} from 'react'
import { getSingleArticle } from '../api'
import { useParams } from 'react-router-dom'
import { dateFormat } from '../utils'
import CommentsList from './CommentsList'
import UpdateArticleVotes from './UpdateArticleVotes'

const SingleArticle = () => {
    const {article_id} = useParams()
    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    
    useEffect(() => {
        setIsLoading(true)

        getSingleArticle(article_id)
        .then((articleData) => {
            setArticle(articleData)
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
        return<p>Article not found</p>
    }
    
    return (
        <section id="single_article_wrap">
            <p className="article_topic">Topic: {article.topic}</p>
            <h2>{article.title}</h2>
            <h3 id='author_header'>By: {article.author}</h3>
            <p className="date">Published: {dateFormat(article.created_at)}</p>
            <div id='article_img_wrapper'>
                <img className='article_img' src={article.article_img_url} alt="image relating to the article title"/>
            </div>
            <div id='article_body_wrap'>
            <p id='article_body'>{article.body}</p>
            </div>
            <div className='article_body_border'></div>
            <div id='votes_and_comments_count'>
                <p className='comment_count'>Comments: <span>{article.comment_count}</span></p>
                {article_id && <UpdateArticleVotes id={article_id}/>}
            </div>
            <div>
                <CommentsList article_id={article_id}/>
            </div>
        </section>
  )
}

export default SingleArticle
