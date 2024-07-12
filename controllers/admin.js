const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const getAllUsers = async (req, res) => {
  const user = await User.find({}).sort("createdAt");
  res.status(StatusCodes.OK).json({ user });
};

const makeUser = async (req, res) => {
  res.status(201).json({ message: "Created" });
};

module.exports = { getAllUsers, makeUser };
