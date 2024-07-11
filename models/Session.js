const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  session_data: {
    type: String,
    required: true,
  },
  expireDate: {
    type: Date,
    required: true,
  },
});

const SessionModel =
  mongoose.models.Session ||
  mongoose.model("Session", SessionSchema, "session");

module.exports = SessionModel;
