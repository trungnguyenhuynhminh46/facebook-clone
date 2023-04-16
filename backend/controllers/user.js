const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const customError = require("../error/customError");
const generateToken = require("../helpers/token");
const {
  sendVerificationEmail,
  sendVerificationCode,
} = require("../helpers/mailer");
const { BASE_URL } = process.env;
const getRandomCode = require("../helpers/getRandomCode");
const User = require("../models/User");
const Code = require("../models/Code");

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
    `${BASE_URL}/verify/${encodeURIComponent(token)}/`
  );
  return res.status(StatusCodes.OK).json({
    message: "Register sucessfully, please check your email to verify!",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
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
  const currentUser = req.user;
  const { token } = req.body;
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(id);
  if (!id || !user) {
    throw new customError(
      "User is not found in the database!",
      StatusCodes.NOT_FOUND
    );
  }
  if (currentUser.id !== id) {
    throw new customError(
      "You don't have the authorization to complete this operation!",
      StatusCodes.BAD_REQUEST
    );
  }
  if (user.verified === true) {
    throw new customError(
      "This user is already verified",
      StatusCodes.BAD_REQUEST
    );
  } else {
    user.verified = true;
    user.save();
  }
  return res.status(StatusCodes.OK).json({
    message: "The user is verified successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
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
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return res.status(StatusCodes.OK).json({
    message: `Welcome ${user.first_name}, you have login successfully!`,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
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
const resentEmail = async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (!user) {
    throw new customError(
      "This user has been removed from the database",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  if (user.verified === true) {
    throw new customError(
      "This user has been verified",
      StatusCodes.BAD_REQUEST
    );
  }
  const token = generateToken({ id: user._id }, "30m");
  sendVerificationEmail(
    user.email,
    user.first_name,
    `${BASE_URL}/verify/${encodeURIComponent(token)}/`
  );
  return res.status(StatusCodes.OK).json({
    message:
      "Verification email has been sent successfully, please check your email to verify!",
  });
};
const getUserByEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new customError(
      "The email isn't matched any account in database",
      StatusCodes.NOT_FOUND
    );
  }
  return res.status(StatusCodes.OK).json({
    message: "Find user by email successfully",
    user: {
      picture: user.picture,
      email: user.email,
      username: user.username,
    },
  });
};
const sendValidationCode = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email }).select("-password");
  const code = getRandomCode(4);
  // Save the code to database
  await Code.findOneAndDelete({ user: user._id });
  const newCode = await new Code({
    code,
    user: user._id,
  });
  newCode.save();
  if (!user) {
    throw new customError(
      `No account with email ${email} is found`,
      StatusCodes.NOT_FOUND
    );
  }
  sendVerificationCode(email, user.first_name, code);
  return res.status(StatusCodes.OK).json({
    message: "Email reset code has been sent to your email",
  });
};
const validateCode = async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new customError(
      `No account with email ${email} is found`,
      StatusCodes.NOT_FOUND
    );
  }
  const dbCode = await Code.findOne({ user: user._id });
  if (!dbCode) {
    throw new customError(
      `No code is found in the database`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  if (code !== dbCode.code) {
    throw new customError(
      `${code} is a wrong code, please recheck in the mailbox`,
      StatusCodes.BAD_REQUEST
    );
  }
  return res.status(StatusCodes.OK).json({
    message: "Success",
  });
};
const resetPassword = async (req, res) => {
  const { newPassword, email } = req.body;
  const user = await User.findOne({ email });
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = newPassword ? bcrypt.hashSync(newPassword, salt) : "";
  if (!hashedPassword) {
    throw new customError(
      "There's something wrong with the password",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  user.password = hashedPassword;
  user.save();
  return res.status(StatusCodes.OK).json({
    message: "Password is changed successfully, please login to continue!",
  });
};
const getUserInfoByUserEmail = async (req, res) => {
  const { email } = req.params;
  const userInfo = await User.findOne({
    email,
  })
    .select("-password")
    .populate({
      path: "friends",
      select: "_id username picture email",
    });
  if (!userInfo) {
    throw new customError(
      `The user with email ${email} is not found`,
      StatusCodes.NOT_FOUND
    );
  }
  return res.status(StatusCodes.OK).json(userInfo);
};
const updateProfilePicture = async (req, res) => {
  const { email, pictureUrl } = req.body;
  const user = await User.findOneAndUpdate(
    { email },
    {
      picture: pictureUrl,
    },
    {
      runValidators: true,
      returnDocument: "after",
    }
  );
  if (!user) {
    throw customError(
      `User with email ${email} is not found`,
      StatusCodes.NOT_FOUND
    );
  }
  return res.status(StatusCodes.OK).json({
    email,
    currentProfilePicture: user.picture,
  });
};

module.exports = {
  register,
  verify,
  login,
  resentEmail,
  getUserByEmail,
  sendValidationCode,
  validateCode,
  resetPassword,
  getUserInfoByUserEmail,
  updateProfilePicture,
};
