import { useState, useEffect } from "react"
import { getTopics } from "../api"
import TopicCard from "./TopicCard"

const TopicsList = () => {
    const [topics, setTopics] = useState([])    
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setIsLoading(true)

        getTopics()
        .then((topics) => {
            setTopics(topics)
            setIsLoading(false)
            setIsError(false)
        })
        .catch((err) => {
            setIsError(true)
            setIsLoading(false)
        })
    }, [])

if(isError){
    return<p>Topics not found</p>
}

if(isLoading){
    return<p>Loading..</p>
}

    return (
        <div>
            <h2 id="topics_heading">Topics:</h2>
            <ol>
                {topics.map((topic) => (<TopicCard key={topic.slug} topic={topic} value={topic.slug}/>))}
            </ol>
        </div>
    )
}

export default TopicsList
