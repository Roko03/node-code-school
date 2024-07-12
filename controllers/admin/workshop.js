const { StatusCodes } = require("http-status-codes");
const Workshop = require("../../models/Workshop");

const getAllWorkshops = async (req, res) => {
  const workshop = await Workshop.find({});
  res.status(StatusCodes.OK).json({ workshop });
};

const makeWorkshop = async (req, res) => {
  const workshop = await Workshop.create(req.body);

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Radionica uspješno kreirana", workshop });
};

module.exports = {
  getAllWorkshops,
  makeWorkshop,
};
