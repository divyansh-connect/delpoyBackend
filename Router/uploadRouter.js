const express = require("express");
const multer = require("multer");
const uploadController = require("../Controller/uploadController");
const authMiddleware = require("../Middleware/authMiddleware");
const uploadRouter = express.Router();

const uploadImage = multer({ storage: multer.memoryStorage() });
const uploadPdf = multer({ storage: multer.memoryStorage() });
const uploadDocFile = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },

  // only image allow
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG & PNG images allowed"), false);
    }
  },
});

uploadRouter.use(authMiddleware);
uploadRouter.post(
  "/stdAdmPhoto",
  uploadImage.single("stdAdmPhoto"),
  uploadController.postStdAdmPhoto,
);
uploadRouter.post(
  "/stdyMaterialFileUpload",
  uploadPdf.single("stdyMaterialFile"),
  uploadController.postStdyMaterialFile,
);
uploadRouter.post(
  "/stdDocument",
  uploadDocFile.single("stdDocumentFile"),
  uploadController.postStdDocument,
);
uploadRouter.post("/deleteStudyMaterial", uploadController.deleteStdyMaterial);

module.exports = uploadRouter;
