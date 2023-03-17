const express = require("express");
const route = express.Router();
// Controllers
const { uploadImages } = require("../controllers/upload");
// Middlewares
const validateImagesUpload = require("../middleware/validateImagesUpload");

route.post("/uploadImages", validateImagesUpload, uploadImages);

module.exports = route;
