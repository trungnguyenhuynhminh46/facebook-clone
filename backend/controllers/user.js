const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const customError = require("../error/customError");
const generateToken = require("../helpers/token");
const sendVerificationEmail = require("../helpers/mailer");
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { first_name, last_name, password, ...rest } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = password ? bcrypt.hashSync(password, salt) : "";
  let user = await User.create({
    first_name,
    last_name,
    username: last_name + " " + first_name || "",
    password: hashedPassword,
    ...rest,
  });
  const token = generateToken({ id: user._id }, "30m");
  sendVerificationEmail(
    user.email,
    user.first_name,
    `${BASE_URL}/verify/${token}`
  );
  return res.status(StatusCodes.OK).json({
    message: "Register sucessfully, please check your email to verify!",
    user: {
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      pronoun: user.pronoun,
      optional_gender: user.optional_gender,
      token: token,
      verified: user.verified,
    },
  });
};
const verify = async (req, res) => {
  const { token } = req.body;
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(id);
  if (user.verified === true) {
    throw customError("This user is already verified", StatusCodes.BAD_REQUEST);
  } else {
    user.verified = true;
    user.save();
  }
  return res.status(StatusCodes.OK).json({
    message: "The user is verified successfully",
    user: {
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      pronoun: user.pronoun,
      optional_gender: user.optional_gender,
      token: token,
      verified: user.verified,
    },
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new customError(
      "Your email is not associated with any accounts!",
      StatusCodes.BAD_REQUEST
    );
  }
  const passwordIsTrue = await bcrypt.compare(password, user.password);
  if (!passwordIsTrue) {
    throw new customError(
      "You have entered wrong password!",
      StatusCodes.BAD_REQUEST
    );
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return res.status(StatusCodes.OK).json({
    message: `Welcome ${user.first_name}, you have login successfully!`,
    token,
    user: {
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      pronoun: user.pronoun,
      optional_gender: user.optional_gender,
      token: token,
      verified: user.verified,
    },
  });
};
const auth = async (req, res) => {
  return res.json("Welcome from auth");
};
module.exports = { register, verify, login, auth };
