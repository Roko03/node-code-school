const express = require("express");
const router = express.Router();

const {
  getProfessorWorkshop,
  getProfessorWorkshopUser,
} = require("../controllers/professor/workshop");

router.route("/workshop").get(getProfessorWorkshop);

router.route("/workshop/:id").get(getProfessorWorkshopUser);

module.exports = router;
