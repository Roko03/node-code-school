const { StatusCodes } = require("http-status-codes");
const Organization = require("../../models/Organization");

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

module.exports = { getAllOrganizations, getOrganiation, makeOrganization };
