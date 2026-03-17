const LibrarySeats = require("../Model/librarySeats");
const LibraryStudents = require("../Model/LibraryStudents");

exports.getSeats = async (req, res, next) => {
  const allSeats = await LibrarySeats.find().sort({ seatNumber: 1 });
  res.status(200).json(allSeats);
};

exports.postAddStudent = async (req, res, next) => {
  const { stdId, stdName, stdPhone, stdJoin, stdGender, stdAmount, stdMember } =
    req.body;

  const joinDate = new Date(stdJoin);
  let validTill = new Date(joinDate);
  let paymentDate = null;

  if (stdAmount !== "Pending") {
    paymentDate = new Date(stdJoin);
  }
  if (stdMember === "1 Month Paid") {
    validTill.setMonth(validTill.getMonth() + 1);
  }
  if (stdMember === "3 Month Paid") {
    validTill.setMonth(validTill.getMonth() + 3);
  }

  const seats = await LibrarySeats.findById(stdId);
  if (!seats) {
    return res.status(404).json({ message: "Seat not found" });
  }

  if (seats.status === "occupied") {
    return res.status(400).json({ message: "Seat already occupied" });
  }

  seats.status = "occupied";
  await seats.save();

  const save = await LibraryStudents.create({
    seatId: seats._id,
    seatNumber: seats.seatNumber,
    name: stdName,
    phone: stdPhone,
    gender: stdGender,
    joinDate,
    payments: [
      {
        amount: stdAmount,
        paymentDate: paymentDate,
        validTill,
      },
    ],
  });
  res.status(200).json(save);
};

exports.getStudentLists = async (req, res, next) => {
  const allStdLists = await LibraryStudents.find()
    .find({ isDeleted: false })
    .sort({ seatNumber: 1 });
  res.status(200).json(allStdLists);
};

exports.getStudent = async (req, res, next) => {
  const { stdId } = req.params;
  const getStudent = await LibraryStudents.findById(stdId);
  res.status(200).json(getStudent);
};

exports.putStudentPay = async (req, res, next) => {
  const { stdId } = req.params;
  const { stdAmount, stdMember } = req.body;
  if (!stdAmount || !stdMember) {
    return res.status(400).json({
      message: "Membership and Amount is required",
    });
  }
  const todayDate = new Date();
  let validTill = new Date(todayDate);

  const stdData = await LibraryStudents.findById(stdId);
  if (!stdData) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  const latestPayment = stdData.payments?.[0];

  if (latestPayment && latestPayment.amount !== "pending") {
    validTill = new Date(latestPayment.validTill);
  }

  if (latestPayment && latestPayment.amount === "pending") {
    latestPayment.amount = stdAmount;
    latestPayment.paymentDate = todayDate;
    if (stdMember !== "1 Month") {
      latestPayment.validTill = new Date(stdData.joinDate);
      latestPayment.validTill.setMonth(latestPayment.validTill.getMonth() + 3);
    }
  } else {
    let membershipMonths = 0;

    if (stdMember === "1 Month") {
      membershipMonths = 1;
    }
    if (stdMember === "3 Month") {
      membershipMonths = 3;
    }
    validTill.setMonth(validTill.getMonth() + membershipMonths);
    stdData.payments.unshift({
      amount: stdAmount,
      paymentDate: todayDate,
      validTill,
    });
  }
  const student = await stdData.save();
  res.status(200).json({
    message: "Payment updated successfully",
    student,
  });
};

exports.putStudentEdit = async (req, res, next) => {
  try {
    const { stdId } = req.params;
    let { stdName, stdPhone, stdGender, stdNewSeat } = req.body;

    // ---------- Basic Validation ----------
    if (!stdName || !stdPhone) {
      return res.status(400).json({
        success: false,
        message: "Invalid student fields",
      });
    }

    stdName = stdName?.trim().replace(/\.+$/, "").toUpperCase();
    stdPhone = stdPhone?.trim();
    stdGender = stdGender?.trim().toLowerCase();

    if (!stdName) {
      return res.status(400).json({
        success: false,
        message: "Invalid name",
      });
    }

    if (!/^[0-9]{10}$/.test(stdPhone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    if (!["male", "female", "other"].includes(stdGender)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gender",
      });
    }

    //  ---------- Find Student ----------
    const std = await LibraryStudents.findById(stdId);
    if (!std) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    // ------------ Seat Change -------------

    if (stdNewSeat !== std.seatNumber) {
      const newSeat = await LibrarySeats.findOne({ seatNumber: stdNewSeat });

      if (!newSeat || newSeat.status !== "available") {
        return res.status(400).json({
          success: false,
          message: "Seat not available",
        });
      }
      await LibrarySeats.findByIdAndUpdate(std.seatId, { status: "available" });

      newSeat.status = "occupied";
      await newSeat.save();
      std.seatId = newSeat._id;
      std.seatNumber = newSeat.seatNumber;
    }

    std.name = stdName;
    std.phone = stdPhone;
    std.gender = stdGender;
    await std.save();

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student: std,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const { stdId } = req.params;
    const std = await LibraryStudents.findById(stdId);
    if (!std || std.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    // ---------- Free Seat ----------
    await LibrarySeats.findByIdAndUpdate(std.seatId, {
      status: "available",
    });

    // ---------- Soft Delete ----------
    std.isDeleted = true;
    std.deletedAt = new Date();
    std.deletedBy = "admin";

    await std.save();
    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
