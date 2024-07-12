const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const getAllUsers = async (req, res) => {
  const user = await User.find({}).sort("createdAt");
  res.status(StatusCodes.OK).json({ user });
};

const makeUser = async (req, res) => {
  const user = await User.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Korisnik uspješno kreiran", user });
};

module.exports = { getAllUsers, makeUser };
