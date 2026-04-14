// External Module
const mongoose = require("mongoose");
const authSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["head", "admin", "staff"],
      default: "staff",
    },
    isHidden: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Auth", authSchema);
