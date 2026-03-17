const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      index: true,
    },
    paymentDate: {
      type: Date,
      default: null,
    },
    validTill: {
      type: Date,
      required: true,
    },
  },
  { _id: false },
);

const libraryStudentsSchema = new mongoose.Schema(
  {
    seatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seats",
      required: true,
      unique: true,
    },
    seatNumber: {
      type: Number,
      required: true,
      index: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    joinDate: {
      type: Date,
      required: true,
      index: true,
    },
    payments: [paymentSchema],

    // Soft Delete
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    deletedBy: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("LibraryStudents", libraryStudentsSchema);
