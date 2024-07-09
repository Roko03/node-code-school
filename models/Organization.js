const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Unesite naziv organizacije"],
    },
    info: {
      type: String,
      minLenght: [10, "Minimalno morate unijeti 6 znakova"],
      required: [true, "Unesite informacije o organizacije"],
    },
  },
  {
    versionKey: false,
  }
);

const OrganizationModel =
  mongoose.models.Organization ||
  mongoose.model("Organization", OrganizationSchema, "organization");

module.exports = OrganizationModel;
