const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

const dotenv = require("dotenv");

// databse

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};

dotenv.config();

app.listen(5001, () => {
  connectDB();
  console.log("Server is running on port 5001");
});
