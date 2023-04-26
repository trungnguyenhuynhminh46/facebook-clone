const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
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
const Post = require("../models/Post");

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
      savedPosts: user.savedPosts,
      search: user.search,
      displayMode: user.displayMode,
    },
  });
};
const verify = async (req, res) => {
  const currentUser = req.user;
  const { token } = req.body;
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(id).populate({
    path: "search.user",
    select: "_id email username picture",
  });
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
      savedPosts: user.savedPosts,
      search: user.search,
      displayMode: user.displayMode,
    },
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate({
    path: "search.user",
    select: "_id email username picture",
  });
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
      savedPosts: user.savedPosts,
      search: user.search,
      displayMode: user.displayMode,
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
  const relationship = {
    isYourFriend: false,
    isFollowedByYou: false,
    // You received a request
    receivedRequest: false,
    // You sent a request
    sentRequest: false,
  };
  const { email } = req.params;
  let userInfo = await User.findOne({
    email,
  }).select("-password");

  if (!userInfo) {
    throw new customError(
      `The user with email ${email} is not found`,
      StatusCodes.NOT_FOUND
    );
  }
  relationship.isYourFriend =
    currentUser.friends.includes(userInfo._id) &&
    userInfo.friends.includes(currentUser._id);
  relationship.isFollowedByYou =
    currentUser.following.includes(userInfo._id) &&
    userInfo.followers.includes(currentUser._id);
  relationship.receivedRequest = currentUser.requests.includes(userInfo._id);
  relationship.sentRequest = userInfo.requests.includes(currentUser._id);

  userInfo = await userInfo.populate({
    path: "friends",
    select: "_id username picture email",
  });
  return res.status(StatusCodes.OK).json({
    userInfo,
    relationship,
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
const toggleFriendRequest = async (req, res) => {
  let status = "error";
  const currentId = req.user.id;
  const targetId = req.params.id;
  if (currentId === targetId) {
    throw new customError(
      "You can not send request to yourself!",
      StatusCodes.BAD_REQUEST
    );
  }
  const currentUser = await User.findById(new ObjectId(currentId));
  if (!currentUser) {
    throw new customError(`User with id ${currentId} is not found!`);
  }
  const target = await User.findById(new ObjectId(targetId));
  if (!target) {
    throw new customError(`User with id ${targetId} is not found!`);
  }
  if (target.friends.includes(currentUser._id)) {
    throw new customError("Already friend!", StatusCodes.BAD_REQUEST);
  }
  // console.log(target.requests.includes(currentUser._id));
  // Request is sended
  if (target.requests.includes(currentUser._id)) {
    status = "cancel";
    target.requests = target.requests.filter((id) => {
      return id.toString() !== currentUser._id.toString();
    });
    target.followers = target.followers.filter((id) => {
      return id.toString() !== currentUser._id.toString();
    });
    currentUser.following = currentUser.following.filter((id) => {
      return id.toString() !== target._id.toString();
    });
    currentUser.save();
    target.save();
  }
  // Request is canceled
  else if (!target.requests.includes(currentUser._id)) {
    status = "send";
    target.requests.push(currentUser._id);
    target.followers.push(currentUser._id);
    currentUser.following.push(target._id);
    currentUser.save();
    target.save();
  } else {
    throw new customError("Check again", StatusCodes.BAD_REQUEST);
  }

  return res.status(StatusCodes.OK).json(status);
};
const acceptRequest = async (req, res) => {
  const currentId = req.user.id;
  const targetId = req.params.id;
  if (targetId.toString() === currentId.toString()) {
    throw new customError(
      "You can not accept your own request!",
      StatusCodes.BAD_REQUEST
    );
  }
  const target = await User.findById(targetId);
  if (!target) {
    throw new customError(`User with id ${targetId} is not found!`);
  }
  const currentUser = await User.findById(currentId);
  if (!currentUser) {
    throw new customError(`User with id ${currentId} is not found!`);
  }
  // Is not friend + there is request
  if (
    !currentUser.friends.includes(target._id) &&
    currentUser.requests.includes(target._id)
  ) {
    currentUser.friends.push(target._id);
    currentUser.requests = currentUser.requests.filter(
      (id) => id.toString() !== target._id.toString()
    );
    currentUser.following.push(target._id);
    target.followers.push(currentUser._id);
    target.friends.push(currentUser._id);
    currentUser.save();
    target.save();

    return res.status(StatusCodes.OK).json("OK");
  }
  // The case that target not accept yet and you canceled
  throw new customError("Check again", StatusCodes.BAD_REQUEST);
};
const declineRequest = async (req, res) => {
  const currentId = req.user.id;
  const targetId = req.params.id;
  if (targetId.toString() === currentId.toString()) {
    throw new customError(
      "You can not decline your own request!",
      StatusCodes.BAD_REQUEST
    );
  }
  const target = await User.findById(targetId);
  if (!target) {
    throw new customError(`User with id ${targetId} is not found!`);
  }
  const currentUser = await User.findById(currentId);
  if (!currentUser) {
    throw new customError(`User with id ${currentId} is not found!`);
  }
  // Is not friend + there is request
  if (
    !currentUser.friends.includes(target._id) &&
    currentUser.requests.includes(target._id)
  ) {
    currentUser.requests = currentUser.requests.filter(
      (id) => id.toString() !== target._id.toString()
    );
    currentUser.followers = currentUser.followers.filter(
      (id) => id.toString() !== target._id.toString()
    );
    target.following = target.following.filter(
      (id) => id.toString() !== currentUser._id.toString()
    );
    target.save();
    currentUser.save();
    return res.status(StatusCodes.OK).json("OK");
  }
  throw new customError("Check again", StatusCodes.BAD_REQUEST);
};
const toggleFollow = async (req, res) => {
  let status = "follow";
  const currentId = req.user.id;
  const targetId = req.params.id;
  if (currentId === targetId) {
    throw new customError(
      `You can not follow yourself!`,
      StatusCodes.BAD_REQUEST
    );
  }
  const currentUser = await User.findById(currentId);
  if (!currentUser) {
    throw new customError(`User with id ${currentId} is not found!`);
  }
  const target = await User.findById(targetId);
  if (!target) {
    throw new customError(`User with id ${targetId} is not found!`);
  }
  // If not following
  if (!currentUser.following.includes(target._id)) {
    status = "follow";
    currentUser.following.push(target._id);
    target.followers.push(currentUser._id);
    currentUser.save();
    target.save();
    return res.status(StatusCodes.OK).json(status);
  }
  // If following
  if (currentUser.following.includes(target._id)) {
    status = "unfollow";
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== target._id.toString()
    );
    target.followers = target.followers.filter(
      (id) => id.toString() !== currentUser._id.toString()
    );
    currentUser.save();
    target.save();
    return res.status(StatusCodes.OK).json(status);
  }
  throw new customError("Check again", StatusCodes.BAD_REQUEST);
};
const unfriend = async (req, res) => {
  const currentId = req.user.id;
  const targetId = req.params.id;
  if (currentId === targetId) {
    throw new customError(
      `You can not follow yourself!`,
      StatusCodes.BAD_REQUEST
    );
  }
  const currentUser = await User.findById(currentId);
  if (!currentUser) {
    throw new customError(`User with id ${currentId} is not found!`);
  }
  const target = await User.findById(targetId);
  if (!target) {
    throw new customError(`User with id ${currentId} is not found!`);
  }
  // If is friend
  if (
    currentUser.friends.includes(target._id) &&
    target.friends.includes(currentUser._id)
  ) {
    currentUser.friends = currentUser.friends.filter(
      (id) => id.toString() !== target._id.toString()
    );
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== target._id.toString()
    );
    currentUser.followers = currentUser.followers.filter(
      (id) => id.toString() !== target._id.toString()
    );
    target.friends = target.friends.filter(
      (id) => id.toString() !== currentUser._id.toString()
    );
    target.following = target.following.filter(
      (id) => id.toString() !== currentUser._id.toString()
    );
    target.followers = target.followers.filter(
      (id) => id.toString() !== currentUser._id.toString()
    );
    currentUser.save();
    target.save();
    return res.status(StatusCodes.OK).json("OK");
  }
  throw new customError("Check again", StatusCodes.BAD_REQUEST);
};
const getFriendsPageData = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) {
    throw new customError(
      `User with id ${userId} is not found`,
      StatusCodes.NOT_FOUND
    );
  }
  // const friends = user.friends;
  const { friends } = await user.populate({
    path: "friends",
    select: "_id picture username email friends",
    populate: {
      path: "friends",
      select: "_id picture username email",
    },
  });
  // Received requests
  const { requests: receivedRequests } = await user.populate({
    path: "requests",
    select: "_id picture username email friends",
    populate: {
      path: "friends",
      select: "_id picture username email",
    },
  });
  // Sent requests
  const sentRequests = await User.find({
    requests: new ObjectId(userId),
  })
    .select("_id picture username email friends")
    .populate({
      path: "friends",
      select: "_id picture username email",
    });

  return res.status(StatusCodes.OK).json({
    friends,
    receivedRequests,
    sentRequests,
  });
};
const toggleSavePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const post = await Post.findById(postId);
  const user = await User.findById(userId);
  if (!user) {
    throw new customError(
      `User with id ${userId} is not found`,
      StatusCodes.NOT_FOUND
    );
  }
  if (!post) {
    throw new customError(
      `Post with id ${postId} is not found`,
      StatusCodes.NOT_FOUND
    );
  }
  const savedPosts = user.savedPosts;
  const postIsSaved = savedPosts.find((p) => {
    return p.post.toString() === post._id.toString();
  });
  // If post is saved
  if (!!postIsSaved) {
    user.savedPosts = user.savedPosts.filter((p) => {
      return p.post.toString() !== post._id.toString();
    });
  }
  // If post is not saved
  if (!postIsSaved) {
    user.savedPosts.push({
      post: post._id,
      savedAt: new Date(),
    });
  }
  user.save();
  return res.status(StatusCodes.OK).json({
    savedPosts: user.savedPosts,
    search: user.search,
    displayMode: user.displayMode,
  });
};
const searchUser = async (req, res) => {
  const { query, page, limit } = req.query;
  const searchedUsers = await User.find({
    username: new RegExp(query, "i"),
  })
    .skip((page - 1) * limit)
    .limit(limit)
    .select("_id email username picture");
  return res.status(StatusCodes.OK).json({
    users: searchedUsers,
    count: searchedUsers ? searchedUsers.length : 0,
  });
};
const saveSearchedUserToHistory = async (req, res) => {
  const { userId } = req.body;
  const currentUserId = req.user.id;
  const currentUser = await User.findById(currentUserId).populate({
    path: "search.user",
    select: "_id email username picture",
  });
  if (!currentUser) {
    throw new customError(`No user with id ${currentUserId} is founded!`);
  }
  const user = await User.findById(userId).select("_id email username picture");
  if (!user) {
    throw new customError(`No user with id ${userId} is founded!`);
  }
  const check = !!currentUser.search.find(({ user: u }) => {
    return u._id.toString() === user._id.toString();
  });
  if (!check) {
    currentUser.search.push({
      user,
      savedAt: new Date(),
    });
  }
  currentUser.save();
  return res.status(StatusCodes.OK).json({ newSearch: currentUser.search });
};
const deleteSearchedUserFromHistory = async (req, res) => {
  const { userId } = req.body;
  const currentUserId = req.user.id;
  const currentUser = await User.findById(currentUserId).populate({
    path: "search.user",
    select: "_id email username picture",
  });
  if (!currentUser) {
    throw new customError(`No user with id ${currentUserId} is founded!`);
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new customError(`No user with id ${userId} is founded!`);
  }
  // console.log(currentUser.search);
  currentUser.search = currentUser.search.filter((u) => {
    return u.user._id.toString() !== user._id.toString();
  });
  currentUser.save();
  return res.status(StatusCodes.OK).json({ newSearch: currentUser.search });
};
const getSearchHistory = async (req, res) => {
  const currentUserId = req.user.id;
  const currentUser = await User.findById(currentUserId).populate({
    path: "search.user",
    select: "_id email username picture",
  });
  if (!currentUser) {
    throw new customError(`No user with id ${currentUserId} is founded!`);
  }
  const search = currentUser.search;
  return res.status(StatusCodes.OK).json({ search });
};
const changeDisplayMode = async (req, res) => {
  const { displayMode } = req.body;
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) {
    throw new customError(`No user with id ${userId} is founded!`);
  }
  const valid = ["light", "dark", "auto"];
  if (!valid.includes(displayMode)) {
    throw new customError(`Display mode can only be light, dark or auto`);
  }
  user.displayMode = displayMode;
  user.save();
  return res.status(StatusCodes.OK).json({
    newDisplayMode: displayMode,
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
  updateProfileCover,
  updateProfileDetails,
  toggleFriendRequest,
  acceptRequest,
  declineRequest,
  toggleFollow,
  unfriend,
  getFriendsPageData,
  toggleSavePost,
  searchUser,
  saveSearchedUserToHistory,
  deleteSearchedUserFromHistory,
  getSearchHistory,
  changeDisplayMode,
};
