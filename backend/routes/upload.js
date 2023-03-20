const express = require("express");
const route = express.Router();
// Controllers
const { uploadImages } = require("../controllers/upload");
// Middlewares
const validateImages = require("../middleware/validateImages");

route.post("/uploadImages", validateImages, uploadImages);

module.exports = route;
