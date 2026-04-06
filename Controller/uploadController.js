const StudDocument = require("../Model/studDocument");
const StudyMaterial = require("../Model/studyMaterial");
const InstitudeStudents = require("../Model/institudeStudents");
const { bucket } = require("../config/firebaseAdmin");

exports.postStdAdmPhoto = async (req, res, next) => {
  const file = req.file;

  // validator
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    return res
      .status(400)
      .json({ message: "Only Jpg, Jpeg, PNG files allowed" });
  }
  if (file.size > 1 * 1024 * 1024) {
    return res.status(400).json({ message: "File size must be less than 1MB" });
  }

  try {
    // Upload
    const fileName = `images/${Date.now()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    await new Promise((resolve, reject) => {
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });
      stream.on("error", reject);
      stream.on("finish", resolve);
      stream.end(file.buffer);
    });
    await fileUpload.makePublic();
    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    if (!fileUrl) {
      return res.status(500).json({
        success: false,
        message: "File upload failed",
      });
    }
    res.status(200).json({
      uploadUrl: fileUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed" });
  }
};

exports.postStdyMaterialFile = async (req, res, next) => {
  const file = req.file;
  const { title, courses } = req.body;

  // Validator
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  if (!title || !courses) {
    return res.status(400).json({ message: "title or course required" });
  }
  if (file.mimetype !== "application/pdf") {
    return res.status(400).json({
      success: false,
      message: "Only PDF files allowed",
    });
  }
  if (file.size > 5 * 1024 * 1024) {
    return res.status(400).json({
      success: false,
      message: "File size must be less than 5MB",
    });
  }
  try {
    // Upload
    const fileName = `pdfs/${Date.now()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    await new Promise((resolve, reject) => {
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });
      stream.on("error", reject);
      stream.on("finish", resolve);
      stream.end(file.buffer);
    });
    await fileUpload.makePublic();
    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    // Db save
    const newMaterial = await StudyMaterial.create({
      course: courses,
      title,
      fileUrl,
    });

    res.status(200).json({
      success: true,
      message: "Upload successfully",
      data: newMaterial,
    });
  } catch (error) {
    next(error);
  }
};

exports.postStdDocument = async (req, res, next) => {
  const { studentId, fileType } = req.body;
  const file = req.file;

  //  validation
  if (!studentId) {
    return res.status(400).json({ message: "studentId required" });
  }
  const allowedTypes = ["marksheet", "diploma"];
  if (!fileType || !allowedTypes.includes(fileType)) {
    return res.status(400).json({ message: "Invalid file" });
  }
  if (!file) {
    return res.status(400).json({ message: "File required" });
  }
  try {
    // Check student
    const student = await InstitudeStudents.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not exits" });
    }

    // Upload to Firebase

    const fileName = `documents/${Date.now()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    await new Promise((resolve, reject) => {
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });
      stream.on("error", reject);
      stream.on("finish", resolve);
      stream.end(file.buffer);
    });
    await fileUpload.makePublic();
    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    // Save in DB
    const save = await StudDocument.create({
      studentId: student._id,
      fileType,
      fileUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      data: save,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteStdyMaterial = async (req, res, next) => {
  const { id, url } = req.body;

  // Check
  if (!id || !url) {
    return res.status(400).json({
      success: false,
      message: "Required fields missing",
    });
  }
  try {
    // Check studyMaterial
    const documentFind = await StudyMaterial.findById(id);
    if (!documentFind) {
      return res.status(404).json({
        success: false,
        message: "Study material not found",
      });
    }
    if (documentFind.fileUrl !== url) {
      return res.status(400).json({
        success: false,
        message: "Study material file not match",
      });
    }
    // extract firebase file path
    const baseUrl = `https://storage.googleapis.com/${bucket.name}/`;
    const filePath = documentFind.fileUrl.startsWith(baseUrl)
      ? documentFind.fileUrl.replace(baseUrl, "")
      : null;

    if (!filePath) {
      return res.status(400).json({
        success: false,
        message: "Invalid file",
      });
    }
    const file = bucket.file(filePath);
    const [exists] = await file.exists();
    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "File already deleted or not found",
      });
    }

    // delete from firebase
    await file.delete();

    // Delete from DB
    await StudyMaterial.findByIdAndDelete(id);

    // Response
    return res.status(200).json({
      success: true,
      message: "Study material deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
