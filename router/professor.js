const express = require("express");
const router = express.Router();

const {
  getProfessorWorkshop,
  getProfessorWorkshopUser,
  removeUserFromWorkshop,
} = require("../controllers/professor/workshop");

router.route("/workshop").get(getProfessorWorkshop);

router.route("/workshop/:id").get(getProfessorWorkshopUser);

router.route("/workshop/:id/user/:user_id").delete(removeUserFromWorkshop);

module.exports = router;
