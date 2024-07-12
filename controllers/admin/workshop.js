const { StatusCodes } = require("http-status-codes");
const Workshop = require("../../models/Workshop");
const { NotFoundError } = require("../../errors");

const getAllWorkshops = async (req, res) => {
  const workshop = await Workshop.find({});
  res.status(StatusCodes.OK).json({ workshop });
};

const getWorkshop = async (req, res) => {
  const {
    params: { id: workshopId },
  } = req;

  const workshop = await Workshop.findOne({ _id: workshopId });

  if (!workshop) {
    throw new NotFoundError("Radionica ne postoji");
  }

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
  getWorkshop,
  makeWorkshop,
};
