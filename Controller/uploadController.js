const fs = require("fs");
const cloudinary = require("../config/cloudinary");

exports.postStdAdmPhoto = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploaded = await cloudinary.uploader.upload(file.path, {
      folder: "admissionPhoto",
      transformation: [{ width: 400, height: 400, crop: "fill" }],
    });
    fs.unlinkSync(file.path);
    res.status(200).json({
      uploadUrl: uploaded.secure_url,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed" });
  }
};

exports.postStdyMaterialFile = async (req, res, next) => {
  try {
    const file = req.file;
    console.log(file);

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files allowed",
      });
    }

    const uploaded = await cloudinary.uploader.upload(file.path, {
      folder: "admissionPhoto",
      timeout: 60000,
    });

    // fs.unlinkSync(file.path);
    res.status(200).json({
      success: true,
      url: uploaded.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return res.status(500).json({
      success: false,
      message: "Cloudinary upload failed",
    });
  }
};
