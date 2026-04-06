const mongoose = require("mongoose");
const studyMaterialSchema = new mongoose.Schema(
  {
    course: { type: String, required: true },
    title: { type: String, required: true },
    fileUrl: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("StudyMaterial", studyMaterialSchema);
