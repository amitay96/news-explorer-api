const router = require('express').Router();
const auth = require('../middlewares/auth');
const { usersRouter } = require('./users');
const { articlesRouter } = require('./articles');
const { validateAuth } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');

const NotFoundError = require('../utils/errors/NotFoundError');

router.post('/signin', validateAuth, login);
router.post('/signup', validateAuth, createUser);

router.use(auth);

router.use('/users', usersRouter);

router.use('/articles', articlesRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

module.exports = router;
