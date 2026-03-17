// Local Module
const Course = require("../Model/course");

exports.postCourse = async (req, res, next) => {
  await Course.create({
    courseName: "",
    courseFullName: "",
    courseTotalFees: "",
    courseAdmissionFee: "",
    courseEnrollment: "",
    courseExamination: "",
    courseMonthlyFee: "",
  });
  res.json({ message: "Added course" });
};

exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.find().lean();
    res.status(200).json({
      success: true,
      count: course.length,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};
