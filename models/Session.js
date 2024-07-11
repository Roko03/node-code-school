const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema(
  {
    session_data: {
      type: String,
      required: true,
    },
    expireDate: {
      type: Date,
      default: () => new Date(+new Date() + 24 * 60 * 60 * 1000),
    },
  },
  { versionKey: false }
);

const SessionModel =
  mongoose.models.Session ||
  mongoose.model("Session", SessionSchema, "session");

module.exports = SessionModel;
