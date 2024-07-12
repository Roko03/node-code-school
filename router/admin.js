const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  makeUser,
  updateUser,
  deleteUser,
} = require("../controllers/admin/user");

const {
  getAllWorkshops,
  getWorkshop,
  makeWorkshop,
  updateWorkshop,
  deleteWorkshop,
} = require("../controllers/admin/workshop");

const {
  getAllOrganizations,
  getOrganiation,
  makeOrganization,
} = require("../controllers/admin/organization");

router.route("/user").get(getAllUsers).post(makeUser);

router.route("/user/:id").get(getUser).patch(updateUser).delete(deleteUser);

router.route("/workshop").get(getAllWorkshops).post(makeWorkshop);

router
  .route("/workshop/:id")
  .get(getWorkshop)
  .patch(updateWorkshop)
  .delete(deleteWorkshop);

router.route("/organization").get(getAllOrganizations).post(makeOrganization);

router.route("/organization/:id").get(getOrganiation);

module.exports = router;
