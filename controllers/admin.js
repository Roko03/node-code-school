const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

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

const updateUser = async (req, res) => {
  const {
    body: { username, email, password, status },
    params: { id: userId },
  } = req;

  if (username === "" || email === "" || password === "") {
    throw new BadRequestError("Polja trebaju biti popunjena");
  }

  const user = await User.findByIdAndUpdate(
    {
      _id: userId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    throw new NotFoundError("Korisnik ne postoji");
  }

  res.status(StatusCodes.OK).json({ user });
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findByIdAndDelete({ _id: userId });

  if (!user) {
    throw new NotFoundError("Korisnik ne postoji");
  }

  res.status(StatusCodes.OK).json({ message: "Korisnik uspješno izbrisan" });
};

module.exports = { getAllUsers, makeUser, getUser, updateUser, deleteUser };
