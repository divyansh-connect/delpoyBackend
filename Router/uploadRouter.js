const express = require("express");
const multer = require("multer");
const uploadController = require("../Controller/uploadController");
const authMiddleware = require("../Middleware/authMiddleware");
const uploadRouter = express.Router();

const uploadImage = multer({ dest: "uploads/" });
const uploadPdf = multer({ dest: "uploadsTest/" });

uploadRouter.use(authMiddleware);
uploadRouter.post(
  "/stdAdmPhoto",
  uploadImage.single("stdAdmPhoto"),
  uploadController.postStdAdmPhoto,
);
uploadRouter.post(
  "/stdyMaterialFile",
  uploadPdf.single("stdyMaterialFile"),
  uploadController.postStdyMaterialFile,
);

module.exports = uploadRouter;
