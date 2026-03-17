require("dotenv").config();
const mongoose = require("mongoose");
const Seats = require("../Model/library");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected "))
  .catch((err) => {
    console.error("Connection Error ", err);
    process.exit(1);
  });

const createSeats = async () => {
  try {
    const seats = [];

    for (let i = 1; i <= 30; i++) {
      seats.push({
        seatNumber: i,
        status: "available",
      });
    }
    await Seats.insertMany(seats);
    console.log("30 seats created successfully ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createSeats();
