const express = require("express");
const router = express.Router();

const { getStudentWorkshop } = require("../controllers/student/student");

router.route("/workshop").get(getStudentWorkshop);

module.exports = router;
