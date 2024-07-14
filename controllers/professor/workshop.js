const { StatusCodes } = require("http-status-codes");
const Workshop = require("../../models/Workshop");
const LoginWorkshop = require("../../models/LoginWorkshop");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../../errors");

const getProfessorWorkshop = async (req, res) => {
  const { _id: user_id } = req.user;

  const workshop = await Workshop.aggregate([
    {
      $match: {
        user_id: user_id,
      },
    },
    {
      $lookup: {
        from: "login-workshop",
        localField: "_id",
        foreignField: "workshop_id",
        as: "numb_of_users",
      },
    },
    {
      $addFields: {
        enteredUser: { $size: "$numb_of_users" },
      },
    },
    {
      $project: {
        user_id: 0,
        createdAt: 0,
        updatedAt: 0,
        numb_of_users: 0,
      },
    },
  ]).exec();

  res.status(StatusCodes.OK).json({ workshop });
};

const getProfessorWorkshopUser = async (req, res) => {
  const {
    user: { _id: userId },
    params: { id: workshopId },
  } = req;

  const workshop = await Workshop.findOne({ _id: workshopId, user_id: userId });

  if (!workshop) {
    throw new NotFoundError("Radionica ne postoji");
  }

  const users = await LoginWorkshop.find({ workshop_id: workshopId })
    .select("-workshop_id")
    .lean()
    .populate("user_id", "_id username email");

  res.status(StatusCodes.OK).json({ users });
};

module.exports = { getProfessorWorkshop, getProfessorWorkshopUser };
