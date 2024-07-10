const mongoose = require("mongoose");

const UserOrganizationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const UserOrganizationModel =
  mongoose.models.UserOrganization ||
  mongoose.model(
    "UserOrganization",
    UserOrganizationSchema,
    "user-organization"
  );

module.exports = UserOrganizationModel;
