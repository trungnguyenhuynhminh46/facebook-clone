const express = require("express");
const route = express.Router();
const { createPost } = require("../controllers/post");

route.post("/create", createPost);

module.exports = route;
