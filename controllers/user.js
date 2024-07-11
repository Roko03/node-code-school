const User = require("../models/User");
const Session = require("../models/Session");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const accessToken = user.genereteAccessToken();
  const refreshToken = user.generateRefreshToken();

  await Session.create({
    session_data: refreshToken,
  });

  res.status(StatusCodes.CREATED).json({
    user: { username: user.username },
    token: {
      accessToken,
      refreshToken,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Molimo unesite email i šifru");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Korisnik sa unesenim emailom ne postoji");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Netočna šifra");
  }

  const accessToken = user.genereteAccessToken();
  const refreshToken = user.generateRefreshToken();

  await Session.create({
    session_data: refreshToken,
  });

  res.status(StatusCodes.OK).json({
    user: { username: user.username },
    token: {
      accessToken,
      refreshToken,
    },
  });
};

module.exports = {
  register,
  login,
};
