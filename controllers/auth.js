require("dotenv").config();
const User = require("../models/User");
const Session = require("../models/Session");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
  ForbiddenError,
} = require("../errors");
const jwt = require("jsonwebtoken");

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

const updateToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new BadRequestError("Potreban vam je token");
  }

  const token = await Session.findOne({ session_data: refreshToken });

  if (!token) {
    throw new UnauthenticatedError("Traženi token ne postoji");
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, payload) => {
      if (err) {
        throw new ForbiddenError("Ključ nije valjan");
      }

      const user = await User.findOne({ _id: payload.userId });

      if (!user) {
        throw new UnauthenticatedError("Korisnik ne postoji");
      }

      const accessToken = user.genereteAccessToken();

      res.status(StatusCodes.OK).json({ accessToken });
    }
  );
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new BadRequestError("Potreban vam je token");
  }

  const token = await Session.findOneAndDelete({ session_data: refreshToken });

  if (!token) {
    throw new NotFoundError("Token ne postoji");
  }

  res
    .status(StatusCodes.NO_CONTENT)
    .json({ message: "Token uspješno izbrisan" });
};

module.exports = {
  register,
  login,
  updateToken,
  logout,
};
