const express = require("express");
const router = express.Router();

const {
  getStudentWorkshop,
  getAllWorkshop,
} = require("../controllers/student/student");

router.route("/").get(getAllWorkshop);

router.route("/workshop").get(getStudentWorkshop);

module.exports = router;
