import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-0xna.onrender.com/api/",
});

const getArticlesByCreateDate = () => {
  return api.get("articles?sort_by=created_at").then(({ data }) => {
    return data.articles;
  });
};

const getArticleById = (article_id) => {
  return api.get(`articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

const getCommentsByArticleId = (article_id) => {
  return api.get(`articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

const updateArticleByIncrementVotes = (article_id) => {
  return api.patch(`articles/${article_id}`, { inc_votes: 1 })
};

const updateArticleByDecrementVotes = (article_id) => {
  return api.patch(`articles/${article_id}`,{inc_votes : -1})
}

const getUsers = () => {
  return api.get(`/users`).then(({data})=>{
    return data.users
  })
}

const postComment = (newComment,article_id) => {
  return api.post(`articles/${article_id}/comments`,newComment)
}

const getTopics = () => {
  return api.get('/topics').then(({data})=>{
    return data.topics
  }).catch((err)=>{
    console.log("Is it the error")
  })
}
const getArticlesByTopic = (topic) => {
  return api.get(`/articles?topic=${topic}`).then(({data})=>{
    return data.articles
  }).catch((err) => {
    console.log(err.response)
    return err.response
  })
}
const deleteCommentById = (comment_id) => {
  return api.delete(`/comments/${comment_id}`)
}
export {
  getArticlesByCreateDate,
  getArticleById,
  getCommentsByArticleId,
  updateArticleByIncrementVotes,
  updateArticleByDecrementVotes,
  getUsers,
  postComment,
  getTopics,
  getArticlesByTopic,
  deleteCommentById
};
