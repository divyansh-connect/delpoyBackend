// External module
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Local Module
const Auth = require("../Model/auth");

exports.getVerify = (req, res, next) => {
  res.json({
    message: "Token valid",
    user: req.user,
  });
};

exports.getAllMember = async (req, res, next) => {
  try {
    const member = await Auth.find({ isHidden: false }).select(
      "firstName lastName userName role",
    );
    if (member.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No members found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "All members fetched successfully",
      data: member,
    });
  } catch (error) {
    next(error);
  }
};

exports.postLogin = async (req, res, next) => {
  const { userName, userPassword } = req.body;
  const user = await Auth.findOne({ userName: userName });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(userPassword, user.userPassword);

  if (!isMatch) {
    return res.status(401).json({ message: "Invaild password" });
  }

  const token = jwt.sign(
    { userName: user.userName, firstName: user.firstName, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    },
  );

  res.json({
    message: "Login successful",
    token,
  });
};

exports.postSignUp = async (req, res, next) => {
  const { firstName, lastName, email, phone, userName, userPassword, role } =
    req.body;

  // validator
  if (!firstName || !email || !phone || !userName || !userPassword) {
    return res
      .status(400)
      .json({ message: "All required fields must be filled" });
  }
  if (userPassword.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  try {
    const hash = await bcrypt.hash(userPassword, 10);
    const save = await Auth.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      userName: userName,
      userPassword: hash,
      role: role,
    });

    res
      .status(201)
      .json({ success: true, message: "User Created", data: save });
  } catch (error) {
    next(error);
  }
};
