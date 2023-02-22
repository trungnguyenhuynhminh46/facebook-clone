const jwt = require("jsonwebtoken");

const generateToken = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });
};

module.exports = generateToken;
