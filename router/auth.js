const express = require("express");
const router = express.Router();

const { register, login, updateToken, logout } = require("../controllers/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/token").post(updateToken);

router.route("/logout").delete(logout);

module.exports = router;
