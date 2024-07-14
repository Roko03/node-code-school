const { StatusCodes } = require("http-status-codes");
const LoginWorkshop = require("../../models/LoginWorkshop");
const Workshop = require("../../models/Workshop");
const mongoose = require("mongoose");

const getStudentWorkshop = async (req, res) => {
  const { _id: userId } = req.user;

  const workshop = await LoginWorkshop.find({ user_id: userId })
    .select("-user_id")
    .lean()
    .populate([
      {
        path: "workshop_id",
        populate: {
          path: "user_id",
          select: "username email",
        },
        select: "-createdAt -updatedAt",
      },
    ]);
  res.status(StatusCodes.OK).json({ workshop });
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

module.exports = { getStudentWorkshop, getAllWorkshop };
