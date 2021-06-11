const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) res.status(401).send({ message: "Access Denied" });
  try {
    const verified = jwt.verify(token, keys.jwtToken);
    req.user = verified;
    next();
  } catch {
    res.status(400).send({ message: "Invalid User" });
  }
};
