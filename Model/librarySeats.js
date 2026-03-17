// External Module
const mongoose = require("mongoose");
const librarySeatsSchema = new mongoose.Schema(
  {
    seatNumber: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["available", "occupied"],
      default: "available",
      index: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("LibrarySeats", librarySeatsSchema);
