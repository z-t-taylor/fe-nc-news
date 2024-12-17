import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-project-enor.onrender.com/api",
});

//Articles
export const getArticles = (topic, sort_by, order_by) => {
  const params = {};

  if (topic && topic !== "null") {
    params.topic = topic;
  }

  if (sort_by) {
    params.sort_by = sort_by;
  }

  if (order_by) {
    params.order_by = order_by;
  }
  return api
    .get("/articles", { params })
    .then(({ data }) => {
      return data.articles;
    })
    .catch((err) => {
      if (err.response) {
        return { status: err.response.status, msg: err.response.data.msg };
      }
    });
};

export const getSingleArticle = (article_id) => {
  return api.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

//Comments

export const getComments = (article_id) => {
  return api
    .get(`/articles/${article_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    })
    .catch((err) => {
      if (err.response) {
        return { status: err.response.status, msg: err.response.data.msg };
      }
    });
};

export const postCommentByArticleId = (article_id, commentData) => {
  const { author, body, created_at, votes } = commentData;
  return api
    .post(`/articles/${article_id}/comments`, {
      username: author,
      body: body,
      created_at: created_at,
      votes: votes,
    })
    .then(({ data }) => {
      return data.comments;
    })
    .catch((err) => {
      if (err.response) {
        return { status: err.response.status, msg: err.response.data.msg };
      }
    });
};

export const patchCommentByCommentId = (comment_id) => {
  return api
    .patch(`/comments/${comment_id}`, { inc_votes: votes })
    .then(({ data }) => {
      return data.comment;
    })
    .catch((err) => {
      if (err.response) {
        return { status: err.response.status, msg: err.response.data.msg };
      }
    });
};

export const deleteCommentByCommentId = (comment_id) => {
  return api.delete(`/comments/${comment_id}`).catch((err) => {
    if (err.response) {
      return { status: err.response.status, msg: err.response.data.msg };
    }
  });
};

//Votes on an Article

export const patchArticleVotes = (article_id, votes) => {
  return api
    .patch(`/articles/${article_id}`, { inc_votes: votes })
    .then(({ data }) => {
      return data.article;
    })
    .catch((err) => {
      if (err.response) {
        return { status: err.response.status, msg: err.response.data.msg };
      }
    });
};

//Topics

export const getTopics = () => {
  return api
    .get("/topics")
    .then(({ data }) => {
      return data.topics;
    })
    .catch((err) => {
      if (err.response) {
        return { status: err.response.status, msg: err.response.data.msg };
      }
    });
};

export const getArticlesByTopic = (topic) => {
  return api
    .get("/articles", {
      params: {
        topic: topic.slug,
      },
    })
    .then(({ data }) => {
      return data.articles;
    })
    .catch((err) => {
      if (err.response) {
        return { status: err.response.status, msg: err.response.data.msg };
      }
    });
};
