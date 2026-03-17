const InstitudeStudents = require("../Model/institudeStudents");
const Payments = require("../Model/payment");

exports.postInstitudeAdmForm = async (req, res, next) => {
  try {
    const save = await InstitudeStudents.create({
      courseId: req.body.cId,
      InstitudeCode: req.body.cCode,
      InstitudeName: req.body.cName,
      courseMedium: req.body.cMedium,
      admissionDate: req.body.admDate,
      admissionSession: req.body.admSession,
      stdName: req.body.stdName,
      stdFathOrHus: req.body.stdFathOrHus,
      stdMother: req.body.stdMoth,
      stdDOB: req.body.stdDOB,
      stdGender: req.body.stdGender,
      stdCategory: req.body.stdCategory,
      stdPhone: req.body.stdPhone,
      stdEmail: req.body.stdEmail,
      stdAadhar: req.body.stdAadhar,
      stdAddresh: req.body.stdAddresh,
      stdCity: req.body.stdCity,
      stdState: req.body.stdState,
      stdPinCode: req.body.stdPinCode,
      stdPhoto: req.body.stdPhoto,
      stdEnroll: req.body.stdEnroll,
    });

    return res.status(201).json({
      success: true,
      message: "Student admission successfully",
      data: save,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Aadhar number already exists",
      });
    }
    next(error);
  }
};

exports.getAllStudents = async (req, res, next) => {
  try {
    const stdLists = await InstitudeStudents.find().populate("courseId");
    res.status(200).json({
      success: true,
      message: "All students fetched",
      data: stdLists,
    });
  } catch (error) {
    next(error);
  }
};

exports.postPayFee = async (req, res, next) => {
  const { studentId, feeType, amount, note, method } = req.body;

  try {
    const save = await Payments.create({
      studentId,
      amount,
      feeType,
      note,
      paymentMethod: method,
    });

    res.status(201).json({
      success: true,
      message: "Student fee submitted sucessfully",
      data: save,
    });
  } catch (error) {
    next(error);
  }
};
