const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const customError = require("../error/customError");
const generateToken = require("../helpers/token");
const sendVerificationEmail = require("../helpers/mailer");
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    gender,
    bDay,
    bMonth,
    bYear,
  } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = password ? bcrypt.hashSync(password, salt) : "";
  let user = await User.create({
    first_name,
    last_name,
    username: last_name + " " + first_name || "",
    email,
    password: hashedPassword,
    gender,
    bDay,
    bMonth,
    bYear,
  });
  const token = generateToken({ id: user._id }, "30m");
  sendVerificationEmail(
    user.email,
    user.first_name,
    `${BASE_URL}/verify/${token}`
  );
  let { password: userPassword, _id, ...userInfo } = user._doc;
  return res.status(StatusCodes.OK).json({
    message: "Register sucessfully, please check your email to verify!",
    user: userInfo,
  });
};
const verify = async (req, res) => {
  const { token } = req.body;
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(id);
  if (user.verified === true) {
    throw customError("This use is already verified", StatusCodes.BAD_REQUEST);
  } else {
    user.verified = true;
    user.save();
  }
  return res
    .status(StatusCodes.OK)
    .json({ message: "The user is verified successfully", user });
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
  let { password: userPassword, _id, ...userInfo } = user._doc;
  return res.status(StatusCodes.OK).json({
    message: `Welcome ${user.first_name}, you have login successfully!`,
    token,
    user: userInfo,
  });
};
module.exports = { register, verify, login };
