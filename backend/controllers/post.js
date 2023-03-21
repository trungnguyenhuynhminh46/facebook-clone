const Post = require("../models/Post");
const customError = require("../error/customError");
const { StatusCodes } = require("http-status-codes");
const createPost = async (req, res) => {
  try {
    const input = req.body;
    const createdPost = new Post(input);
    const savedPost = createdPost.save();
    return res.status(StatusCodes.OK).json(savedPost);
  } catch (err) {
    throw new customError(err.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({}).populate({
      path: "user",
      select: "-_id first_name last_name username email picture gender",
    });
    return res.status(StatusCodes.OK).json({
      posts: allPosts,
    });
  } catch (err) {
    throw new customError(err.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = { createPost, getAllPosts };
