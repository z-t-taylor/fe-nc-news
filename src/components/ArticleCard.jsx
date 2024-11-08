import { Link } from "react-router-dom"
import { dateFormat } from "../utils"

const ArticleCard = ({article}) => {
    const formattedDate = dateFormat(article.created_at)

    return (
        <div className="article_card">
            <Link to={`/articles/${article.article_id}`} className="article_link">
                <p className="article_topic">Topic: {article.topic}</p>
                <h3>{article.title}</h3>
                <p className="date">Date: {formattedDate}</p>
                <div id="votes_comments">
                    <p className="comments">Comments: <span>{article.comment_count}</span></p>
                    <p className="votes_on_article">Votes: <span>{article.votes}</span></p>
                </div>
            </Link>
        </div>
    )
}

export default ArticleCard
