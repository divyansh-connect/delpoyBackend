const fs = require("fs");
const streamifier = require("streamifier");
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
    // if (file.mimetype !== "application/pdf") {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Only PDF files allowed",
    //   });
    // }
    console.log("check Done 1");
    // const stream = cloudinary.uploader.upload_stream(
    //   {
    //     folder: "studyMaterial",
    //     resource_type: "raw",
    //   },
    //   (error, result) => {
    //     if (error) {
    //       console.error("Cloudinary error:", error);
    //       return res.status(500).json({
    //         success: false,
    //         message: "Upload failed",
    //       });
    //     }
    //     console.log(result);
    //     res.status(200).json({
    //       success: true,
    //       url: result.secure_url,
    //     });
    //   },
    // );

    // streamifier.createReadStream(file.buffer).pipe(stream);

    const uploaded = await cloudinary.uploader.upload(file.path, {
      folder: "admissionPhoto",
      timeout: 60000,
    });
    console.log("check Done 2");
    // fs.unlinkSync(file.path);
    console.log("check Done 3", uploaded.secure_url);
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
