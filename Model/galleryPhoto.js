const mongoose = require("mongoose");

const gallerySchema = mongoose.Schema(
  {
    fileUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("GalleryPhoto", gallerySchema);
