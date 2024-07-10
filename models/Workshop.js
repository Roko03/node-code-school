const mongoose = require("mongoose");

const WorkshopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Unesite ime radionce"],
    },
    time: {
      type: Date,
      required: [true, "Unesite datum i vrijeme radionce"],
    },
    info: {
      type: String,
      required: false,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Molimo unesite predavača"],
    },
    level: {
      type: String,
      enum: ["jun", "mid", "sen"],
      default: "jun",
      required: [true, "Molimo unesite razinu"],
    },
    subject: {
      type: String,
      enum: ["rjs", "ex", "njs"],
      default: "rjs",
      required: [true, "Molimo unesite predmet"],
    },
  },
  { timestamps: true, versionKey: false }
);

const WorkshopModel =
  mongoose.models.Workshop ||
  mongoose.model("Workshop", WorkshopSchema, "workshop");

module.exports = WorkshopModel;
