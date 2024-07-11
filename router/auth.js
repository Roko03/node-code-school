const express = require("express");
const router = express.Router();

const { register, login, updateToken } = require("../controllers/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/token").post(updateToken);

module.exports = router;
