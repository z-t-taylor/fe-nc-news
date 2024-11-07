import axios from "axios";

const api = axios.create({
    baseURL:"https://nc-news-project-enor.onrender.com/api"
})

//Articles
export const getArticles = (topic) => {
    if(topic){
        return api.get("/articles", {
            params: {
                topic: topic
            }
        }).then(({data}) => {
            return data.articles
        })
    }
    return api.get("/articles").then(({data}) => {
        return data.articles;
    })
}

export const getSingleArticle = (article_id) => {
    return api.get(`/articles/${article_id}`).then(({data}) => {
        return data.article;
    })
}

//Comments

export const getComments = (article_id) => {
    return api.get(`/articles/${article_id}/comments`).then(({data}) => {
        return data.comments
    })
}

export const postCommentByArticleId = (article_id, commentData) => {
    const {author, body, created_at, votes} = commentData
    return api.post(`/articles/${article_id}/comments`, {
        username: author, 
        body: body,
        created_at: created_at,
        votes: votes,
    })
    .then(({data}) => {
        return data.comments
    })
}

export const deleteCommentByCommentId = (comment_id) => {
    return api.delete(`/comments/${comment_id}`)
}

//Votes on an Article

export const patchArticleVotes = (article_id, votes) => {
    return api.patch(`/articles/${article_id}`, {inc_votes: votes}).then(({data}) => {
        return data.article
    })
}

//Topics

export const getTopics = () => {
    return api.get("/topics").then(({data}) => {
        return data.topics
    })
}

export const getArticlesByTopic = (topic) => {
    return api.get("/articles", {
        params: {
            topic: topic.slug
        }
    }).then(({data}) => {
        return data.articles
    })
}
