const StudyMaterial = require("../Model/studyMaterial");
exports.getAllStdyMatarial = async (req, res, next) => {
  try {
    const allStdyNotes = await StudyMaterial.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Find successfully",
      data: allStdyNotes,
    });
  } catch (error) {
    next(error);
  }
};

exports.getDCAStdyMatarial = async (req, res, next) => {
  try {
    const allStdyNotes = await StudyMaterial.find().sort({ course: "DCA" });
    res.status(200).json({
      success: true,
      message: "Find successfully",
      data: allStdyNotes,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPGDCAStdyMatarial = async (req, res, next) => {
  try {
    const allStdyNotes = await StudyMaterial.find().sort({ course: "PGDCA" });
    res.status(200).json({
      success: true,
      message: "Find successfully",
      data: allStdyNotes,
    });
  } catch (error) {
    next(error);
  }
};
