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