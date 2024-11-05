import { Link } from "react-router-dom"
import { dateFormat } from "../utilis"

const ArticleCard = ({article}) => {
    const formattedDate = dateFormat(article.created_at)

    return (
        <div className="article_card">
            <Link to={`/articles/${article.article_id}`} className="article_link">
                <p className="article_topic">Topic: {article.topic}</p>
                <h3>{article.title}</h3>
                <p className="date">Date: {formattedDate}</p>
                <p className="votes">Votes: {article.votes}</p>
            </Link>
        </div>
    )
}

export default ArticleCard
