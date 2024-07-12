const express = require("express");
const router = express.Router();

const { getAllUsers, makeUser } = require("../controllers/admin");

router.route("/user").get(getAllUsers).post(makeUser);

module.exports = router;
