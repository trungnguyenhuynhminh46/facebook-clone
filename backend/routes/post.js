const express = require("express");
const route = express.Router();
// Controllers
const { createPost, getAllPosts } = require("../controllers/post");
// Middlewares
const authorizationMiddleware = require("../middleware/auth");

route.get("/getAllPosts", getAllPosts);
route.post("/createPost", authorizationMiddleware, createPost);

module.exports = route;
