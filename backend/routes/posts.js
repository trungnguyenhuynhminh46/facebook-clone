const express = require("express");
const route = express.Router();
// Controllers
const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} = require("../controllers/posts");
// Middlewares
const authorizationMiddleware = require("../middleware/auth");

route.get("/getAllPosts", authorizationMiddleware, getAllPosts);
route.post("/createPost", authorizationMiddleware, createPost);
route.patch("/:postId", authorizationMiddleware, updatePost);
route.delete("/:postId", authorizationMiddleware, deletePost);

module.exports = route;
