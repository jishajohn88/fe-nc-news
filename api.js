import axios from "axios";

const api = axios.create(({
    baseURL: "https://nc-news-0xna.onrender.com/api/"
}))

const getArticlesByCreateDate = () =>{
    return api.get("articles?sort_by=created_at").then(({data}) => {
        return data.articles
    })
}

const getArticleById = (article_id) => {
    return api.get(`articles/${article_id}`).then(({data}) => {
        return data.article
    })
}

const getCommentsByArticleId = (article_id) => {
    return api.get(`articles/${article_id}/comments`).then(({data}) => {
        return data.comments
    })
}

export {getArticlesByCreateDate,getArticleById,getCommentsByArticleId};