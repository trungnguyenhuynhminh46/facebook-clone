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

module.exports = { createPost };
