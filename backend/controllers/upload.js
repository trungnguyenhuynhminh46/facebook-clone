// Đầu vào: một form data với các files
// Đầu ra: một mảng các đường dẫn file đó lên cloudinary
const cloudinary = require("cloudinary").v2;
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_APP_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const customError = require("../error/customError");
const { StatusCodes } = require("http-status-codes");
const removePath = require("../helpers/removePath");
const uploadImages = async (req, res) => {
  const { path } = req.body;
  const files = Object.values(req.files).flat();
  const imagesURL = [];
  for (const file of files) {
    const url = await uploadImageToCloudinary(file, path);
    imagesURL.push(url);
  }
  return res.status(StatusCodes.OK).json(imagesURL);
};
const uploadImageToCloudinary = async (file, path = "/") => {
  try {
    const res = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: path,
    });
    return res.secure_url;
  } catch (err) {
    throw new customError(err.message, StatusCodes.BAD_REQUEST);
  } finally {
    removePath(file.tempFilePath);
  }
};
module.exports = { uploadImages };
