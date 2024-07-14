const { StatusCodes } = require("http-status-codes");
const Organization = require("../../models/Organization");
const User = require("../../models/User");
const UserOrganization = require("../../models/UserOrganization");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../../errors");

const getAllOrganizations = async (req, res) => {
  const organization = await Organization.find({});

  res.status(StatusCodes.OK).json({ organization });
};

const getOrganiation = async (req, res) => {
  const { id: organizationId } = req.params;

  const organization = await Organization.findOne({ _id: organizationId });

  if (!organization) {
    throw new NotFoundError("Organizacija ne postoji");
  }

  res.status(StatusCodes.OK).json({ organization });
};

const makeOrganization = async (req, res) => {
  const organization = await Organization.create(req.body);

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Organizacija uspješno kreirana", organization });
};

const updateOrganization = async (req, res) => {
  const {
    body: { name, info },
    params: { id: organizationId },
  } = req;

  if (name === "" || info === "") {
    throw new BadRequestError("Polja trebaju biti popunjena");
  }

  const organization = await Organization.findByIdAndUpdate(
    {
      _id: organizationId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!organization) {
    throw new NotFoundError("Organizacija ne postoji");
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Uspješno uređeno", organization });
};

const deleteOrganization = async (req, res) => {
  const { id: organizationId } = req.params;

  const organization = await Organization.findByIdAndDelete({
    _id: organizationId,
  });

  if (!organization) {
    throw new NotFoundError("Organizacija ne postoji");
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Organizacija uspješno izbrisan" });
};

const addUserToOrganization = async (req, res) => {
  const {
    params: { id: organizationId, user_id: userId },
  } = req;

  const user = await User.findOne({ _id: userId });
  const organization = await Organization.findOne({ _id: organizationId });

  if (!user || !organization) {
    throw new NotFoundError("Korisnik ili organizacija ne postoje");
  }

  if (user.role !== "prof") {
    throw new UnauthenticatedError("Korisnik nema ulogu profesora");
  }

  const userOrganization = await UserOrganization.create({
    user_id: userId,
    organization_id: organizationId,
  });

  res.status(StatusCodes.CREATED).json({ userOrganization });
};

module.exports = {
  getAllOrganizations,
  getOrganiation,
  makeOrganization,
  updateOrganization,
  deleteOrganization,
  addUserToOrganization,
};
