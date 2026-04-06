const mongoose = require("mongoose");

const studDocumentSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },
    fileType: {
      type: String,
      enum: ["marksheet", "diploma"],
      required: true,
      index: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    isIssued: {
      type: Boolean,
      default: false,
      index: true,
    },
    isIssuedDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("StudDocument", studDocumentSchema);
