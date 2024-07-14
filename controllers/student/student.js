const { StatusCodes } = require("http-status-codes");
const LoginWorkshop = require("../../models/LoginWorkshop");
const User = require("../../models/User");

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
          model: "User",
          select: "username email",
        },
        select: "-createdAt -updatedAt",
      },
    ]);
  res.status(StatusCodes.OK).json({ workshop });
};

module.exports = { getStudentWorkshop };
