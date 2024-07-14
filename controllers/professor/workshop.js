const { StatusCodes } = require("http-status-codes");
const Workshop = require("../../models/Workshop");

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
        numb_of_users: 0,
      },
    },
  ]).exec();

  res.status(StatusCodes.OK).json({ workshop });
};

module.exports = { getProfessorWorkshop };
