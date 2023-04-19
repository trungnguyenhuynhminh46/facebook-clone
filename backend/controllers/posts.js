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
  await Post.findByIdAndDelete(postId);
  return res.status(StatusCodes.OK).json(null);
};
const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({})
      .populate({
        path: "user",
        select: "first_name last_name username email picture cover gender",
      })
      .sort({ createdAt: "desc" });
    return res.status(StatusCodes.OK).json({
      posts: allPosts,
    });
  } catch (err) {
    throw new customError(err.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
const getPostsByEmail = async (req, res) => {
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
    .populate({
      path: "user",
      select: "first_name last_name username email picture cover gender",
    })
    .sort({ createdAt: "desc" });
  if (!postsByEmail) {
    return res.status(StatusCodes.OK).json({ posts: [] });
  }
  return res.status(StatusCodes.OK).json({ posts: postsByEmail });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostsByEmail,
  updatePost,
  deletePost,
};
