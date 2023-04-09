const express = require("express");
const route = express.Router();
// Controllers
const { uploadImages, getImages } = require("../controllers/upload");
// Middlewares
const validateImages = require("../middleware/validateImages");
const authorizationMiddleware = require("../middleware/auth");

route.post(
  "/uploadImages",
  authorizationMiddleware,
  validateImages,
  uploadImages
);

route.post("/getImages", authorizationMiddleware, getImages);

module.exports = route;
