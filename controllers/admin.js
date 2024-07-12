const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getAllUsers = async (req, res) => {
  const user = await User.find({}).sort("createdAt");
  res.status(StatusCodes.OK).json({ user });
};

const getUser = async (req, res) => {
  const {
    params: { id: userId },
  } = req;
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotFoundError("Korisnik ne postoji");
  }

  res.status(StatusCodes.OK).json(user);
};

const makeUser = async (req, res) => {
  const user = await User.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Korisnik uspješno kreiran", user });
};

module.exports = { getAllUsers, makeUser, getUser };
