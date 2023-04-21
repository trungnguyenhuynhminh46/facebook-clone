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
    username: first_name + " " + last_name || "",
    password: hashedPassword,
    ...rest,
  });
  const token = generateToken({ id: user._id }, "30d");
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
      cover: user.cover,
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
      cover: user.cover,
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
      cover: user.cover,
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
  const currentUser = await User.findById(req.user.id);
  // To render on UI
  const relationShip = {
    isYourFriend: false,
    isFollowedByYou: false,
    //
    receivedRequest: false,
    sentRequest: false,
  };
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
  if (userInfo._id.toString() === currentUser._id.toString()) {
    return res.status(StatusCodes.OK).json({
      userInfo,
      relationShip,
    });
  }
  relationShip.isYourFriend =
    currentUser.friends.includes(userInfo._id) &&
    userInfo.friends.includes(currentUser._id);
  relationShip.isFollowedByYou =
    currentUser.following.includes(userInfo._id) &&
    userInfo.followers.includes(currentUser._id);
  relationShip.receivedRequest = currentUser.requests.includes(userInfo._id);
  relationShip.sentRequest = userInfo.requests.includes(currentUser._id);

  return res.status(StatusCodes.OK).json({
    userInfo,
    relationShip,
  });
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
const updateProfileCover = async (req, res) => {
  const { email, cover } = req.body;
  const user = await User.findOneAndUpdate(
    { email },
    {
      cover,
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
    currentCoverPicture: cover,
  });
};
const updateProfileDetails = async (req, res) => {
  const { email, details } = req.body;
  const user = await User.findOneAndUpdate(
    { email },
    {
      details,
    },
    {
      runValidators: true,
      returnDocument: "after",
    }
  );
  if (!user) {
    throw new customError(
      `Thus use with email ${email} is not found`,
      StatusCodes.NOT_FOUND
    );
  }
  return res.status(StatusCodes.OK).json({
    email,
    newDetails: user.details,
  });
};
// Sender's action
const toggleFriendRequest = async (req, res) => {
  const senderId = req.user.id;
  const receiverId = req.params.id;
  if (senderId.toString() === receiverId.toString()) {
    throw new customError(
      "You can not send request to yourself!",
      StatusCodes.BAD_REQUEST
    );
  }
  const sender = await User.findById(senderId);
  if (!sender) {
    throw new customError(`User with id ${senderId} is not found!`);
  }
  const receiver = await User.findById(receiverId);
  if (!receiver) {
    throw new customError(`User with id ${receiverId} is not found!`);
  }
  if (receiver.friends.includes(sender._id)) {
    throw new customError("Already friend!", StatusCodes.BAD_REQUEST);
  }
  // Request is sended
  if (receiver.requests.includes(sender._id)) {
    receiver.requests = receiver.requests.filter((id) => {
      return id !== sender._id;
    });
    receiver.followers = receiver.followers.filter((id) => {
      return id !== sender._id;
    });
    sender.following = sender.following.filter((id) => {
      return id !== receiver._id;
    });
    sender.save();
    receiver.save();
    return res.status(StatusCodes.OK).json("OK");
  }
  // Request is not sended
  if (!receiver.requests.includes(sender._id)) {
    receiver.requests.push(sender._id);
    receiver.followers.push(sender._id);
    sender.following.push(receiver._id);
    sender.save();
    receiver.save();
    return res.status(StatusCodes.OK).json("OK");
  }
  throw new customError("Check again", StatusCodes.BAD_REQUEST);
};
// Receiver's action
const acceptRequest = async (req, res) => {
  const receiverId = req.user.id;
  const senderId = req.params.id;
  if (senderId.toString() === receiverId.toString()) {
    throw new customError(
      "You can not accept your own request!",
      StatusCodes.BAD_REQUEST
    );
  }
  const sender = await User.findById(senderId);
  if (!sender) {
    throw new customError(`User with id ${senderId} is not found!`);
  }
  const receiver = await User.findById(receiverId);
  if (!receiver) {
    throw new customError(`User with id ${receiverId} is not found!`);
  }
  // Is not friend + there is request
  if (
    !receiver.friends.includes(sender._id) &&
    receiver.requests.includes(sender._id)
  ) {
    // Receiver
    receiver.friends.push(sender._id);
    receiver.requests = receiver.requests.filter((id) => id !== sender._id);
    // Sender
    sender.friends.push(receiver._id);
    receiver.save();
    sender.save();
    return res.status(StatusCodes.OK).json("OK");
  }
  throw new customError("Check again", StatusCodes.BAD_REQUEST);
};
const declineRequest = async (req, res) => {
  const receiverId = req.user.id;
  const senderId = req.params.id;
  if (senderId.toString() === receiverId.toString()) {
    throw new customError(
      "You can not decline your own request!",
      StatusCodes.BAD_REQUEST
    );
  }
  const sender = await User.findById(senderId);
  if (!sender) {
    throw new customError(`User with id ${senderId} is not found!`);
  }
  const receiver = await User.findById(receiverId);
  if (!receiver) {
    throw new customError(`User with id ${receiverId} is not found!`);
  }
  // Is not friend + there is request
  if (
    !receiver.friends.includes(sender._id) &&
    receiver.requests.includes(sender._id)
  ) {
    receiver.requests = receiver.requests.filter((id) => id !== sender._id);
    receiver.followers = receiver.followers.filter((id) => id !== sender._id);
    sender.following = sender.following.filter((id) => id !== receiver._id);
    sender.save();
    receiver.save();
    return res.status(StatusCodes.OK).json("OK");
  }
  throw new customError("Check again", StatusCodes.BAD_REQUEST);
};
//
const toggleFollow = async (req, res) => {
  const userId = req.user.id;
  const targetId = req.body.id;
  if (userId === targetId) {
    throw new customError(
      `You can not follow yourself!`,
      StatusCodes.BAD_REQUEST
    );
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new customError(`User with id ${userId} is not found!`);
  }
  const target = await User.findById(targetId);
  if (!target) {
    throw new customError(`User with id ${userId} is not found!`);
  }
  // If not following
  if (!user.following.includes(target._id)) {
    user.following.push(target._id);
    target.followers.push(user._id);
    user.save();
    target.save();
    return res.statusCode(StatusCodes.OK).json("OK");
  }
  // If following
  if (user.following.includes(target._id)) {
    user.following = user.following.filter((id) => id !== target._id);
    target.followers = target.followers.filter((id) => id !== user._id);
    user.save();
    target.save();
    return res.statusCode(StatusCodes.OK).json("OK");
  }
  throw new customError("Check again", StatusCodes.BAD_REQUEST);
};
const unfriend = async (req, res) => {
  const userId = req.user.id;
  const targetId = req.body.id;
  if (userId === targetId) {
    throw new customError(
      `You can not follow yourself!`,
      StatusCodes.BAD_REQUEST
    );
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new customError(`User with id ${userId} is not found!`);
  }
  const target = await User.findById(targetId);
  if (!target) {
    throw new customError(`User with id ${userId} is not found!`);
  }
  // If is friend
  if (user.friends.includes(target._id) && target.friends.includes(user._id)) {
    user.friends = user.friends.filter((id) => id !== target._id);
    user.following = user.following.filter((id) => id !== target._id);
    user.followers = user.followers.filter((id) => id !== target._id);
    target.friends = target.friends.filter((id) => id !== user._id);
    target.following = target.following.filter((id) => id !== user._id);
    target.followers = target.followers.filter((id) => id !== user._id);
    user.save();
    target.save();
    return res.status(StatusCodes.OK).json("OK");
  }
  throw new customError("Check again", StatusCodes.BAD_REQUEST);
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
  updateProfileCover,
  updateProfileDetails,
  toggleFriendRequest,
  acceptRequest,
  declineRequest,
  toggleFollow,
  unfriend,
};
