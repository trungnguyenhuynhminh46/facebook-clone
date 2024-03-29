const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const customError = require("../error/customError");
const { StatusCodes } = require("http-status-codes");
const createPost = async (req, res) => {
  try {
    const input = req.body;
    const createdPost = new Post(input);
    const savedPost = await createdPost.save();
    const returnPost = await Post.findById(savedPost._id).populate({
      path: "user",
      select: "first_name last_name username email picture cover gender",
    });
    return res.status(StatusCodes.OK).json(returnPost);
  } catch (err) {
    throw new customError(err.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
const updatePost = async (req, res) => {
  const { postId } = req.params;
  const changes = req.body;
  const updatedPost = await Post.findByIdAndUpdate(postId, changes, {
    returnDocument: "after",
    runValidators: true,
  }).populate({
    path: "user",
    select: "first_name last_name username email picture cover gender",
  });
  if (!updatedPost) {
    throw new customError(`Post with id ${postId} is not existed`);
  }
  return res.status(StatusCodes.OK).json(updatedPost);
};
const deletePost = async (req, res) => {
  const { postId } = req.params;
  const deletedPost = await Post.findByIdAndDelete(postId, {
    returnDocument: "before",
  }).populate({
    path: "user",
    select: "first_name last_name username email picture cover gender",
  });
  return res.status(StatusCodes.OK).json({ email: deletedPost.user.email });
};
const getPostsForHomePage = async (req, res) => {
  // Page: page number
  // Limit: numbers of items per page
  const { following } = await User.findById(req.user.id);
  const { _page, _limit } = req.query;
  const posts = await Post.find({
    $or: [
      { user: { $in: following } },
      { user: { $eq: new mongoose.Types.ObjectId(req.user.id) } },
    ],
  })
    .skip((_page - 1) * _limit)
    .limit(_limit)
    .populate({
      path: "user",
      select: "first_name last_name username email picture cover gender",
    })
    .sort({ createdAt: "desc" });
  const count = posts ? posts.length : 0;
  return res.status(StatusCodes.OK).json({ posts, count });
};
const getPostsByEmail = async (req, res) => {
  const { _page, _limit } = req.query;
  const { email } = req.params;
  const author = await User.findOne({ email });
  if (!author) {
    throw new customError(
      `No user with email ${email} is found`,
      StatusCodes.NOT_FOUND
    );
  }
  const postsByEmail = await Post.find({
    user: author._id,
  })
    .skip((_page - 1) * _limit)
    .limit(_limit)
    .populate({
      path: "user",
      select: "first_name last_name username email picture cover gender",
    })
    .sort({ createdAt: "desc" });
  const count = postsByEmail ? postsByEmail.length : 0;
  // if (!postsByEmail) {
  //   return res.status(StatusCodes.OK).json({ posts: [], count: 0 });
  // }
  return res.status(StatusCodes.OK).json({ posts: postsByEmail, count: count });
};

module.exports = {
  createPost,
  getPostsByEmail,
  updatePost,
  deletePost,
  getPostsForHomePage,
};
