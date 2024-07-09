const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Unesi svoje korisničko ime"],
    },
    email: {
      type: String,
      required: [true, "Unesi svoj email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ,
        "Unesite valjan email",
      ],
      unique: true,
    },
    passsword: {
      type: String,
      required: [true, "Unesite lozinku"],
      minLength: [6, "Lozinka mora biti duljine od 6 karaktera"],
    },
    bio: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["prof", "stu", "adm"],
      required: true,
      default: "stu",
    },
  },
  { timestamps: true, versionKey: false }
);

const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema, "user");

module.exports = UserModel;
