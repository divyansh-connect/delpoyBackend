const GalleryPhoto = require("../Model/galleryPhoto");

exports.getGalleryPhotos = async (req, res, next) => {
  try {
    const data = await GalleryPhoto.find();
    res.status(200).json({
      success: true,
      message: "Find successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
