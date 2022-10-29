const router = require('express').Router();
const { usersRouter } = require('./users');
const { articlesRouter } = require('./articles');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');

router.use(auth);

router.use('/users', usersRouter);

router.use('/articles', articlesRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

module.exports = router;
