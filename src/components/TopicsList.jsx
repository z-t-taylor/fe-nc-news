import { useState, useEffect } from "react"
import { getTopics } from "../api"
import TopicCard from "./TopicCard"

const TopicsList = () => {
    const [topics, setTopics] = useState([])    
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

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
    return<p className='inline_error_and_loading'>Topics not found</p>
}

if(isLoading){
    return<p className='inline_error_and_loading'>Loading..</p>
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
