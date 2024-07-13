const { StatusCodes } = require("http-status-codes");
const Workshop = require("../../models/Workshop");
const User = require("../../models/User");
const LoginWorkshop = require("../../models/LoginWorkshop");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../../errors");

const getAllWorkshops = async (req, res) => {
  const workshop = await Workshop.find({})
    .lean()
    .populate("user_id", "_id username email");
  res.status(StatusCodes.OK).json({ workshop });
};

const getWorkshop = async (req, res) => {
  const {
    params: { id: workshopId },
  } = req;

  const workshop = await Workshop.findOne({ _id: workshopId })
    .lean()
    .populate("user_id", "_id username email");

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

const updateWorkshop = async (req, res) => {
  const {
    body: { name, time, user_id, level, subject },
    params: { id: workshopId },
  } = req;

  if (
    name === "" ||
    time === "" ||
    user_id === "" ||
    level === "" ||
    subject === ""
  ) {
    throw new BadRequestError("Polja trebaju biti popunjena");
  }

  const workshop = await Workshop.findByIdAndUpdate(
    {
      _id: workshopId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!workshop) {
    throw new NotFoundError("Radionica ne postoji");
  }

  res.status(StatusCodes.OK).json({ message: "Uspješno uređeno", workshop });
};

const deleteWorkshop = async (req, res) => {
  const { id: workshopId } = req.params;

  const workshop = await Workshop.findByIdAndDelete({ _id: workshopId });

  if (!workshop) {
    throw new NotFoundError("Radionica ne postoji");
  }

  res.status(StatusCodes.OK).json({ message: "Radionica uspješno izbrisan" });
};

const addUserToWorkshop = async (req, res) => {
  const { id: workshopId, user_id: userId } = req.params;

  const user = await User.findOne({ _id: userId });
  const workshop = await Workshop.findOne({ _id: workshopId });

  if (!user || !workshop) {
    throw new NotFoundError("Korisnik ili organizacija ne postoje");
  }

  if (user.role !== "stu") {
    throw new UnauthenticatedError("Korisnik nema ulogu studenta");
  }

  const userWorkshop = await LoginWorkshop.create({
    user_id: userId,
    workshop_id: workshopId,
  });

  res.status(StatusCodes.CREATED).json({ userWorkshop });
};

module.exports = {
  getAllWorkshops,
  getWorkshop,
  makeWorkshop,
  updateWorkshop,
  deleteWorkshop,
  addUserToWorkshop,
};
