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

  const token = jwt.sign({ userName: user.userName }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  res.json({
    message: "Login successful",
    token,
  });
};

exports.postSignUp = async (req, res, next) => {
  try {
    const signUp = {
      firstName: "Divyansh",
      lastName: "SuperAdmin",
      email: "essencedivine.connect@gmail.com",
      phone: "7389558879",
      userName: "SuperAdmin",
      userPassword: "SuperAdmin",
      role: "admin",
    };

    const hash = await bcrypt.hash(signUp.userPassword, 10);
    const save = await Auth.create({
      firstName: signUp.firstName,
      lastName: signUp.lastName,
      email: signUp.email,
      phone: signUp.phone,
      userName: signUp.userName,
      userPassword: hash,
      role: signUp.role,
    });
    res.json({ message: "User Created", save });
  } catch (error) {
    res.status(500).json({ message: "Error", err });
  }
};
