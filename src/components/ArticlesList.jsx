import {useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import { getArticles } from '../api'
import ArticleCard from './ArticleCard'

const ArticlesList = () => {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [morePages, setMorePages] = useState(5)
    const [searchParams] = useSearchParams()

    const topic = searchParams.get("topic")

    useEffect(() => {
        setIsLoading(true)

        getArticles(topic)
        .then((articles) => {
            setArticles(articles)
            setIsLoading(false)
            setIsError(false)
        })
        .catch((err) => {
            setIsError(true)
            setIsLoading(false)
        })
    }, [topic])

    if(isLoading){
        return<p>Loading..</p>
    }

    if(isError){
        return<p>Articles not found</p>
    }

    return (
        <section className='articles_list'>
            <h2>{topic ? `${topic}:`:"All Articles:"}</h2>
            <ol>
                {articles.slice(0, morePages ? morePages :articles.length).map((article) => {
                    return <ArticleCard key={article.article_id} article={article} />
                })}
            </ol>
            <div className='pagination_button_wrap'>
                <button className="pagination_button" onClick={() => setMorePages(morePages - 5)}>Less</button>
                <button className="pagination_button" onClick={() => setMorePages(morePages + 5)}>More</button>
            </div>
        </section>
    )
}

export default ArticlesList
