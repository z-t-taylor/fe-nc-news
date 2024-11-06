import axios from "axios";

const api = axios.create({
    baseURL:"https://nc-news-project-enor.onrender.com/api"
})

//Articles
export const getArticles = () => {
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

export const patchArticleVotes = (article_id, votes) => {
    return api.patch(`/articles/${article_id}`, {inc_votes: votes}).then(({data}) => {
        return data.article
    })
}