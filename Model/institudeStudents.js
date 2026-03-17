const mongoose = require("mongoose");
const institudeStudentSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    InstitudeCode: {
      type: Number,
      required: true,
    },
    admissionDate: {
      type: Date,
      required: true,
    },
    admissionSession: {
      type: String,
      required: true,
    },
    InstitudeName: {
      type: String,
      required: true,
    },
    courseMedium: {
      type: String,
      required: true,
    },

    stdName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    stdFathOrHus: {
      type: String,
      required: true,
      trim: true,
    },

    stdMother: {
      type: String,
      trim: true,
      default: "",
    },

    stdDOB: {
      type: Date,
      required: true,
    },

    stdGender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    stdCategory: {
      type: String,
      required: true,
    },

    stdPhone: {
      type: String,
      required: true,
      index: true,
    },

    stdEmail: {
      type: String,
      trim: true,
      default: "",
    },

    stdAadhar: {
      type: String,
      required: true,
      unique: true,
    },

    stdAddresh: {
      type: String,
      trim: true,
      default: "",
    },

    stdCity: {
      type: String,
      required: true,
    },

    stdState: {
      type: String,
      required: true,
    },

    stdPinCode: {
      type: String,
      required: true,
    },

    stdPhoto: {
      type: String,
      required: true,
    },

    stdEnroll: {
      type: String,
      default: null,
    },

    // Soft delete
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("InstitudeStudents", institudeStudentSchema);
