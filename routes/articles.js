const router = require("express").Router();
const { getUsers, getCurrentUser } = require("../controllers/users");

// router.get("/articles", getArticles);

// router.post("/articles", createArticle);

// router.delete("/articles/:id", deleteArticle);

module.exports = { articlesRouter: router };
