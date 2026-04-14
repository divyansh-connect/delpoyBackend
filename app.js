require("dotenv").config();
// External Module
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

// Local Module
const libaryRouter = require("./Router/libaryRouter");
const authRouter = require("./Router/authRouter");
const uploadRouter = require("./Router/uploadRouter");
const courseRouter = require("./Router/courseRouter");
const institudeRouter = require("./Router/institudeRouter");
const announcementRouter = require("./Router/announcementRouter");
const stdyMatarialRouter = require("./Router/stdyMatarialRouter");
const healthRouter = require("./Router/healthRouter");
const dashBoardRouter = require("./Router/dashBoardRouter");

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());
app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashBoardRouter);
app.use("/api/course", courseRouter);
app.use("/api/announcement", announcementRouter);
app.use("/api/stdyMaterialFile", stdyMatarialRouter);
app.use("/api/institude", institudeRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/library", libaryRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
// MulterError handler
app.use((err, req, res, next) => {
  // multer size error
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: err.message,
    });
  }
  // custom file type error
  if (err.message === "Only vaild files images allowed") {
    return res.status(400).json({
      message: err.message,
    });
  }
  // fallback error
  return res.status(500).json({
    message: err.message || "Something went wrong",
  });
});

const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {});
  })
  .catch((err) => {});
