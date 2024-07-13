const mongoose = require("mongoose");

const LoginWorkshopSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workshop_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workshop",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

LoginWorkshopSchema.index({ user_id: 1, workshop_id: 1 }, { unique: true });

const LoginWorkshopModel =
  mongoose.models.LoginWorkshop ||
  mongoose.model("LoginWorkshop", LoginWorkshopSchema, "login-workshop");

module.exports = LoginWorkshopModel;
