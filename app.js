require("dotenv").config();
// External Module
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Local Module
const libaryRouter = require("./Router/libaryRouter");
const authRouter = require("./Router/authRouter");
const uploadRouter = require("./Router/uploadRouter");
const courseRouter = require("./Router/courseRouter");
const institudeRouter = require("./Router/institudeRouter");
const announcementRouter = require("./Router/announcementRouter");
const stdyMatarialRouter = require("./Router/stdyMatarialRouter");

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

app.use("/api/course", courseRouter);
app.use("/api/announcement", announcementRouter);
app.use("/api/stdyMaterialFile", stdyMatarialRouter);
app.use("/api/institude", institudeRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/auth", authRouter);
app.use("/api/library", libaryRouter);

const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {});
  })
  .catch((err) => {});
