const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  makeUser,
  updateUser,
  deleteUser,
} = require("../controllers/admin");

router.route("/user").get(getAllUsers).post(makeUser);

router.route("/user/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
