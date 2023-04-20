const express = require("express");
const route = express.Router();
// Controllers
const {
  createPost,
  getPostsByEmail,
  updatePost,
  deletePost,
  getPostsForHomePage,
} = require("../controllers/posts");
// Middlewares
const authorizationMiddleware = require("../middleware/auth");

route.get("/getPostsForHomePage", authorizationMiddleware, getPostsForHomePage);
route.get("/getPostsByEmail/:email", authorizationMiddleware, getPostsByEmail);
route.post("/createPost", authorizationMiddleware, createPost);
route.patch("/:postId", authorizationMiddleware, updatePost);
route.delete("/:postId", authorizationMiddleware, deletePost);

module.exports = route;
