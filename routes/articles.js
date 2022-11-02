const router = require('express').Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');
const { validateId, validateArticle } = require('../middlewares/validation');

router.get('/', getArticles);

router.post('/', validateArticle, createArticle);

router.delete('/:id', validateId, deleteArticle);

module.exports = { articlesRouter: router };
