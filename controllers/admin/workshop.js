const { StatusCodes } = require("http-status-codes");
const Workshop = require("../../models/Workshop");

const getAllWorkshops = (req, res) => {
  const workshop = Workshop.find({});
  res.status(StatusCodes.OK).json({ workshop });
};

module.exports = {
  getAllWorkshops,
};
