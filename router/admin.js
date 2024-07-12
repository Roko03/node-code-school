const express = require("express");
const router = express.Router();

const { getAllUsers, getUser, makeUser } = require("../controllers/admin");

router.route("/user").get(getAllUsers).post(makeUser);

router.route("/user/:id").get(getUser);

module.exports = router;
