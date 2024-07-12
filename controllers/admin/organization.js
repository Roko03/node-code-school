const { StatusCodes } = require("http-status-codes");
const Organization = require("../../models/Organization");

const getAllOrganizations = async (req, res) => {
  const organization = await Organization.find({});

  res.status(StatusCodes.OK).json({ organization });
};

module.exports = { getAllOrganizations };
