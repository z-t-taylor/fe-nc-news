import { useEffect, useState } from 'react'
import { getSingleArticle, patchArticleVotes } from '../api'

const UpdateArticleVotes = ({id}) => {
    const [votes, setVotes] = useState(0)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        getSingleArticle(id)
        .then((article) => {
            setVotes(article.votes)
            setIsError(false)
        })
        .catch((err) => {
            setIsError(true)
        })
    }, [id])

    const handleUpVote = (upVote) => {
        setVotes((currVotes) => currVotes + upVote)
        setIsError(false)
        patchArticleVotes(id, upVote)
        .catch((err) => {
            setVotes((currVotes) => currVotes - upVote);
            setIsError(true)
        })
    }

    const handleDownVote = (downVote) => {
        setVotes((currVotes) => currVotes - downVote)
        setIsError(false)
        patchArticleVotes(id, -downVote)
        .catch((err) => {
            setVotes((currVotes) => currVotes + downVote);
            setIsError(true)
        })
    }

    if(isError){
        return <p>Error, cannot update votes</p>
    }

    return (
        <div className='vote_change'>
            <button aria-label='up vote button' id="upVote" onClick={() => handleUpVote(1)}>v</button>
            <p id='vote_count'>Votes: <span>{votes}</span></p>
            <button aria-label='down vote button' id="downVote" onClick={() => handleDownVote(1)}>v</button>
        </div>
    )
}

export default UpdateArticleVotes
