const Article = require("../models/article");

const UnauthorizedError = require("../utils/errors/UnauthorizedError");
const BadRequestError = require("../utils/errors/BadRequestError");
const ConflictError = require("../utils/errors/ConflictError");
const NotFoundError = require("../utils/errors/NotFoundError");

const getArticles = (req, res, next) => {
    return Article.find({})
        .then(articles => res.status(200).send({ data: articles }))
        .catch(next);

};

module.exports = { getArticles };