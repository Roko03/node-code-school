const { StatusCodes } = require("http-status-codes");
const LoginWorkshop = require("../../models/LoginWorkshop");
const Workshop = require("../../models/Workshop");
const mongoose = require("mongoose");
const { NotFoundError } = require("../../errors");

const getStudentWorkshop = async (req, res) => {
  const { _id: userId } = req.user;

  const allWorkshop = await Workshop.find({}).lean();

  const studentWorkshop = await LoginWorkshop.find({ user_id: userId })
    .distinct("workshop_id")
    .lean();

  const stringStudentWorkshop = studentWorkshop.map((item) => item.toString());

  const workshops = allWorkshop.filter((workshop) =>
    stringStudentWorkshop.includes(workshop._id.toString())
  );

  res.status(StatusCodes.OK).json({ workshops });
};

const getAllWorkshop = async (req, res) => {
  const { _id: userId } = req.user;

  const allWorkshop = await Workshop.find({}).lean();

  const studentWorkshop = await LoginWorkshop.find({
    user_id: userId,
  })
    .distinct("workshop_id")
    .lean();

  const stringStudentWorkshop = studentWorkshop.map((item) => item.toString());

  const workshops = allWorkshop.filter(
    (workshop) => !stringStudentWorkshop.includes(workshop._id.toString())
  );

  res.status(StatusCodes.OK).json({ workshops });
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
