const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true,
      index: true,
      unique: true,
    },
    courseFullName: {
      type: String,
      trim: true,
      index: true,
    },
    courseTotalFees: {
      type: Number,
      required: true,
    },
    courseAdmissionFee: {
      type: Number,
      default: 0,
    },
    courseEnrollment: {
      type: Number,
      default: 0,
    },
    courseExamination: {
      type: Number,
      default: 0,
    },
    courseMonthlyFee: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Course", courseSchema);
