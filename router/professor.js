const express = require("express");
const router = express.Router();

const { getProfessorWorkshop } = require("../controllers/professor/workshop");

router.route("/workshop").get(getProfessorWorkshop);

module.exports = router;
