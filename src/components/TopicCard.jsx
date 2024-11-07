import { Link } from "react-router-dom"
import { getArticlesByTopic } from "../api"

const TopicCard = ({topic}) => {

    const handleTopic = (topic) => {
        getArticlesByTopic(topic)
    }

  return (
    <div className="article_card">
      <Link to={`/articles?topic=${topic.slug}`} className="article_link" onClick={handleTopic}>
        <h3 id="topic_card_slug">{topic.slug}</h3>
        <p id="topic_description">{topic.description}</p>
      </Link>
    </div>
  )
}

export default TopicCard
