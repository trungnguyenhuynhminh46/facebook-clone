const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const createPost = async (req, res) => {
  const createdPost = new Post(req.body).save();
  return res.status(StatusCodes.OK).json({
    message: "Post is created successfully",
    post: createdPost,
  });
};

module.exports = { createPost };
