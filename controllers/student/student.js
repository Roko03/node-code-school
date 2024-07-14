const { StatusCodes } = require("http-status-codes");
const LoginWorkshop = require("../../models/LoginWorkshop");
const Workshop = require("../../models/Workshop");
const mongoose = require("mongoose");
const { NotFoundError } = require("../../errors");

const getStudentWorkshop = async (req, res) => {
  const { _id: userId } = req.user;

  const workshop = await Workshop.aggregate([
    {
      $lookup: {
        from: "login-workshop",
        localField: "_id",
        foreignField: "workshop_id",
        as: "workshop",
      },
    },
    {
      $match: {
        "workshop.user_id": { $eq: new mongoose.Types.ObjectId(userId) },
      },
    },
    {
      $lookup: {
        from: "user",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        workshop: 0,
        createdAt: 0,
        updatedAt: 0,
        user_id: 0,
        "user.createdAt": 0,
        "user.updatedAt": 0,
        "user.role": 0,
        "user.password": 0,
      },
    },
  ]);

  res.status(StatusCodes.OK).json({ workshop });
};

const getAllWorkshop = async (req, res) => {
  const { _id: userId } = req.user;

  const workshop = await Workshop.aggregate([
    {
      $lookup: {
        from: "login-workshop",
        localField: "_id",
        foreignField: "workshop_id",
        as: "workshop",
      },
    },
    {
      $match: {
        "workshop.user_id": { $ne: new mongoose.Types.ObjectId(userId) },
      },
    },
    {
      $lookup: {
        from: "user",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        workshop: 0,
        createdAt: 0,
        updatedAt: 0,
        user_id: 0,
        "user.createdAt": 0,
        "user.updatedAt": 0,
        "user.role": 0,
        "user.password": 0,
      },
    },
  ]);

  res.status(StatusCodes.OK).json({ workshop });
};

const joinWorkshop = async (req, res) => {
  const {
    user: { _id: userId },
    params: { id: workshopId },
  } = req;

  const loginWorkshop = await LoginWorkshop.create({
    user_id: userId,
    workshop_id: workshopId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Student uspješno prijavljen", loginWorkshop });
};

const leaveWorkshop = async (req, res) => {
  const {
    user: { _id: userId },
    params: { id: workshopId },
  } = req;

  const loginWorkshop = await LoginWorkshop.findOneAndDelete({
    user_id: userId,
    workshop_id: workshopId,
  });

  if (!loginWorkshop) {
    throw new NotFoundError("Korisnik unutar te radionice ne postoji");
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Uspješno ste napustili radionicu" });
};

module.exports = {
  getStudentWorkshop,
  getAllWorkshop,
  joinWorkshop,
  leaveWorkshop,
};
