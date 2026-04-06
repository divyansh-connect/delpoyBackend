const InstitudeStudents = require("../Model/institudeStudents");
const Payments = require("../Model/payment");
const StudDocument = require("../Model/studDocument");

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

exports.getAllStudentsAndPay = async (req, res, next) => {
  try {
    const students = await InstitudeStudents.find({
      isDeleted: false,
    }).populate("courseId");
    const result = [];
    for (const student of students) {
      const payments = await Payments.find({ studentId: student._id });
      const totalPaid = payments.reduce((sum, pay) => sum + pay.amount, 0);
      const remaining = student.courseId.courseTotalFees - totalPaid;
      result.push({
        _id: student._id,
        stdName: student.stdName,
        stdFathOrHus: student.stdFathOrHus,
        stdPhone: student.stdPhone,
        courseId: student.courseId,
        totalPaid,
        remaining,
      });
    }

    res.status(200).json({
      success: true,
      message: "All students fetched",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getStudentbyID = async (req, res, next) => {
  const { sid } = req.params;
  if (!sid) {
    return res.status(400).json({
      success: false,
      message: "Student ID is required",
    });
  }
  try {
    const { sid } = req.params;
    const std = await InstitudeStudents.findById(sid).populate("courseId");
    if (!std) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    const payment = await Payments.find({ studentId: std._id });
    const totalPaid = payment.reduce((sum, pay) => sum + Number(pay.amount), 0);

    const finalStudent = {
      ...std.toObject(),
      totalPaid,
    };

    res.status(200).json({
      success: true,
      message: "Student fetched successfully",
      data: finalStudent,
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

exports.getAllPaymentbyID = async (req, res, next) => {
  const { sid } = req.params;
  if (!sid) {
    return res.status(400).json({
      success: false,
      message: "Student ID is required",
    });
  }
  try {
    const payments = await Payments.find({ studentId: sid }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      message:
        payments.length === 0
          ? "No payments found"
          : "Payments fetched successfully",
      data: payments || [],
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllDocumentbyID = async (req, res, next) => {
  const { sid } = req.params;
  if (!sid) {
    return res.status(400).json({
      success: false,
      message: "Student ID is required",
    });
  }
  try {
    const payments = await StudDocument.find({ studentId: sid });
    res.status(200).json({
      success: true,
      message:
        payments.length === 0
          ? "No documents found"
          : "Documents fetched successfully",
      data: payments || [],
    });
  } catch (error) {
    next(error);
  }
};

exports.putMarkbyID = async (req, res, next) => {
  const { sid } = req.params;

  try {
    if (!sid) {
      return res.status(400).json({
        message: "Student document ID is required",
      });
    }

    const updatedDoc = await StudDocument.findByIdAndUpdate(
      sid,
      {
        isIssued: true,
        isIssuedDate: new Date(),
      },
      { returnDocument: "after" },
    );

    if (!updatedDoc) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Document marked as issued",
      data: updatedDoc,
    });
  } catch (error) {
    next(error);
  }
};
