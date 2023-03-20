const express = require("express");
const route = express.Router();
// Controllers
const { createPost } = require("../controllers/post");

route.post("/createPost", createPost);
module.exports = route;
