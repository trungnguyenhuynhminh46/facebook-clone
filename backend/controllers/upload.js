const cloudinary = require("cloudinary").v2;
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
const customError = require("../error/customError");
const { StatusCodes } = require("http-status-codes");

const uploadImages = async (req, res) => {
  const { path } = req.body;
  const files = Object.values(req.files).flat();
  const imagesUrl = [];
  for (const file of files) {
    const url = await uploadImageToCloudinary(file, path);
    imagesUrl.push(url);
  }
  return res.status(StatusCodes.OK).json({ imagesUrl });
};

const uploadImageToCloudinary = async (file, path) => {
  try {
    const data = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: path,
    });
    return data.secure_url;
  } catch (err) {
    throw new customError(err.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const getImages = async (req, res) => {
  try {
    const { folder, sort, max } = req.body;
    // console.log(req.body);
    const { total_count, resources } = await cloudinary.search
      .expression(`folder:${folder} AND resource_type:image`)
      .sort_by("created_at", sort)
      .max_results(max)
      .execute();
    const imagesUrl = resources.map(({ secure_url }) => {
      return secure_url;
    });
    return res.status(StatusCodes.OK).json({ total_count, imagesUrl });
  } catch (err) {
    throw new customError(err.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = { uploadImages, getImages };
