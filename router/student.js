const express = require("express");
const router = express.Router();

const {
  getStudentWorkshop,
  getAllWorkshop,
  joinWorkshop,
} = require("../controllers/student/student");

router.route("/").get(getAllWorkshop);

router.route("/workshop").get(getStudentWorkshop);

router.route("/workshop/:id").post(joinWorkshop);

module.exports = router;
