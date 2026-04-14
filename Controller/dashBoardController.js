// Local Module
const Course = require("../Model/course");
const InstitudeStudents = require("../Model/institudeStudents");
const Payments = require("../Model/payment");

exports.getDashboardsCourse = async (req, res, next) => {
  try {
    const courses = await Course.find().lean();
    const students = await InstitudeStudents.find({ isDeleted: false }).lean();
    const studentIds = students.map((std) => std._id.toString());
    const payments = await Payments.find({
      studentId: { $in: studentIds },
    }).lean();

    // Payment Map
    const paymentMap = {};
    payments.forEach((p) => {
      const id = p.studentId.toString();
      paymentMap[id] = (paymentMap[id] || 0) + Number(p.amount);
    });

    const result = courses.map((course) => {
      // filter students of this course
      const courseStd = students.filter(
        (std) => std.courseId.toString() === course._id.toString(),
      );

      const totalStudent = courseStd.length;
      const totalFee = totalStudent * course.courseTotalFees;

      let received = 0;
      let pendingStudents = 0;
      const courseStdIds = courseStd.map((std) => std._id.toString());

      courseStdIds.forEach((std) => {
        const paid = paymentMap[std] || 0;
        received += paid;
        if (paid <= course.courseTotalFees) {
          pendingStudents++;
        }
      });
      const pending = totalFee - received;

      return {
        courseName: course.courseName,
        courseFullName: course.courseFullName,
        courseTotalFees: course.courseTotalFees,
        courseAdmissionFee: course.courseAdmissionFee,
        courseEnrollment: course.courseEnrollment,
        courseExamination: course.courseExamination,
        courseMonthlyFee: course.courseMonthlyFee,
        totalStudent,
        totalFee,
        received,
        pending,
        pendingStudents,
      };
    });
    res.status(200).json({
      success: true,
      message: "All course fetched",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getDashboardspayment = async (req, res, next) => {
  try {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Start dates
    const startOfYear = new Date(currentYear, 0, 1);
    const startOfLastMonth = new Date(currentYear, currentMonth - 1, 1);

    // Pick date
    const startDate =
      startOfLastMonth < startOfYear ? startOfLastMonth : startOfYear;

    // Call DB
    const payments = await Payments.find({ createdAt: { $gte: startDate } })
      .select("amount createdAt")
      .lean();

    let thisYear = 0;
    let thisMonth = 0;
    let lastMonth = 0;

    for (const payment of payments) {
      const amount = Number(payment.amount);
      const date = new Date(payment.createdAt);

      const dbMonth = date.getMonth();
      const dbYear = date.getFullYear();

      // This year
      if (dbYear === currentYear) {
        thisYear += amount;
        if (dbMonth === currentMonth) {
          thisMonth += amount;
        }
      }
      // last Month
      if (
        (currentMonth === 0 && dbMonth === 11 && dbYear === currentYear - 1) ||
        (dbMonth === currentMonth - 1 && dbYear === currentYear)
      ) {
        lastMonth += amount;
      }
    }

    return res.status(200).json({
      success: true,
      message: "Payments dates fetched",
      data: {
        thisMonth,
        lastMonth,
        thisYear,
      },
    });
  } catch (error) {
    next(error);
  }
};
