const router = require("express").Router();

const NotFoundError = require("../utils/errors/NotFoundError");

router.get("/users/me", getUser);

router.get("/articles", getArticles);

router.post("/articles", createArticle);

router.delete("/articles/:id", deleteArticle);

router.use("*", (req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
