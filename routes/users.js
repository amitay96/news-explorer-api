const router = require("express").Router();
const { getUsers, getCurrentUser } = require("../controllers/users");

router.get("/", getUsers);

router.get("/users/me", getCurrentUser);

module.exports = { usersRouter: router };
