const mongoose = require("mongoose");
const { validateEmail } = require("../helpers/validation");

const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    post_reactions: {
      type: [{ type: ObjectId, ref: "Reaction" }],
      default: [],
    },
    comment_reactions: {
      type: [{ type: ObjectId, ref: "Reaction" }],
      default: [],
    },
    first_name: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
      text: true,
    },
    last_name: {
      type: String,
      required: [true, "last name is required"],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      text: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: true,
      validate: [validateEmail, "Email you typed has wrong format"],
      minlength: [6, "Your email must have at least 6 characters"],
      maxlength: [100, "Your email can not have more than 20 characters"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    picture: {
      type: String,
      trim: true,
      default:
        "https://res.cloudinary.com/dbrd0cias/image/upload/v1676961543/default_user_sofrta.png",
    },
    cover: {
      type: String,
      trim: true,
      default: "",
    },
    gender: {
      type: String,
      required: [true, "gender is required"],
      trim: true,
    },
    bYear: {
      type: Number,
      required: true,
      trim: true,
    },
    bMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    bDay: {
      type: Number,
      required: true,
      trim: true,
    },
    pronoun: {
      type: String,
      default: "",
    },
    optional_gender: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: [{ type: ObjectId, ref: "User" }],
      default: [],
    },
    following: {
      type: [{ type: ObjectId, ref: "User" }],
      default: [],
    },
    followers: {
      type: [{ type: ObjectId, ref: "User" }],
      default: [],
    },
    // Request that is received
    requests: {
      type: [{ type: ObjectId, ref: "User" }],
      default: [],
    },
    search: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
        savedAt: {
          type: Date,
          require: true,
        },
      },
    ],
    details: {
      bio: {
        type: String,
        default: "",
      },
      otherName: {
        type: String,
        default: "",
      },
      job: {
        type: String,
        default: "",
      },
      workplace: {
        type: String,
        default: "",
      },
      highSchool: {
        type: String,
        default: "",
      },
      college: {
        type: String,
        default: "",
      },
      currentCity: {
        type: String,
        default: "",
      },
      hometown: {
        type: String,
        default: "",
      },
      relationship: {
        type: String,
        enum: ["Single", "In a relationship", "Married", "Divorced", ""],
        default: "",
      },
      instagram: {
        type: String,
        default: "",
      },
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          require: true,
        },
      },
    ],
    displayMode: {
      type: String,
      enum: ["dark", "light", "auto"],
      default: "light",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
