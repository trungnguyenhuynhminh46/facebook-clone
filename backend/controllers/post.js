const Post = require("../models/Post");
const customError = require("../error/customError");
const { StatusCodes } = require("http-status-codes");
const createPost = async (req, res) => {
  const input = req.body;
  const createdPost = new Post(input);
  createdPost.save((err, savedPost) => {
    if (err) {
      throw new customError(err.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
    if (savedPost) {
      return res.status(StatusCodes.OK).json(savedPost);
    }
  });
};

module.exports = { createPost };
