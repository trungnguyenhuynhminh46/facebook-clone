const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const codeSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Code is required"],
      trim: true,
      text: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Code", codeSchema);
