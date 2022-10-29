const Article = require("../models/article");

const BadRequestError = require("../utils/errors/BadRequestError");
const ForbiddenError = require("../utils/errors/ForbiddenError");
const NotFoundError = require("../utils/errors/NotFoundError");

const getArticles = (req, res, next) => {
    // const owner = req.user._id;
    Article.find({  })
        .then(articles => res.status(200).send(articles))
        .catch(next);

};

const createArticle = (req, res, next) => {
    const { keyword, title, text, date, source, link, image } = req.body;
    const { _id } = req.user;
    Article.create({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
        owner: _id,
    })
        .then((article) => res.status(201).send(article))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                next(new BadRequestError(err.message));
            } else {
                next(err);
            }
        });
};

const deleteArticle = (req, res, next) => {
    const { articleId } = req.params;
    Article.findById(articleId)
        .orFail(() => {
            throw new NotFoundError('Article not found');
        })
        .then((article) => {
            if (article.owner.toString() !== req.user._id) {
                return next(new ForbiddenError('You are not authorized to delete this article'));
            }
            return Article.findByIdAndRemove(articleId).then((deletedArticle) => res
                .status(200)
                .send({ message: 'Article removed successfully', deletedArticle }));
        })
        .catch(console.log("fffF"));
};

module.exports = { getArticles, createArticle, deleteArticle };