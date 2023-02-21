const mongoose = require("mongoose");

const connectDB = async (connection_string) => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(connection_string);
};

module.exports = connectDB;
