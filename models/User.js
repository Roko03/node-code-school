const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Unesi svoje korisničko ime"],
      unique: true,
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

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.passsword = await bcrypt.hash(this.passsword, salt);
  next();
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      name: this.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: `${process.env.JWT_LIFETIME}`,
    }
  );
};

UserSchema.methods.comparePassword = async function (pwd) {
  const isMatch = await bcrypt.compare(pwd, this.passsword);
  return isMatch;
};

const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema, "user");

module.exports = UserModel;
