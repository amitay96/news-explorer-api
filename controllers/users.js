const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const UnauthorizedError = require("../utils/errors/UnauthorizedError");
const BadRequestError = require("../utils/errors/BadRequestError");
const ConflictError = require("../utils/errors/ConflictError");
const NotFoundError = require("../utils/errors/NotFoundError");

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError("Email already exists");
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      User.create({
        email,
        password: hash,
      })
    )
    .then((user) => res.status(201).send({ data: user.toJSON() }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "development-secret",
        {
          expiresIn: "7d",
        }
      );
      res.send({ data: user.toJSON(), token });
    })
    .catch(() => {
      next(new UnauthorizedError("Incorrect email or password"));
    });
};

const processUserWithId = (req, res, action, next) =>
  action
    .orFail(() => {
      throw new NotFoundError("No user found with this Id");
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError(err.message));
      } else if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  console.log(req.body);
  processUserWithId(req, res, User.findById(req.data.user._id), next);
};

const getUserbyId = (req, res, next) => {
  processUserWithId(req, res, User.findById(req.params.id), next);
};

module.exports = { createUser, login, getUsers, getCurrentUser, getUserbyId };
