const { UnauthenticatedError } = require("../errors");

const roleAuthentication = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      throw new UnauthenticatedError("Korisnik nema ulogu za tu radnju");
    }

    next();
  };
};

module.exports = roleAuthentication;
