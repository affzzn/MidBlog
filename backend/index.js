const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const authRouter = require("./routes/auth");

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

//middlewares

dotenv.config();
app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(5001, () => {
  connectDB();
  console.log("Server is running on port 5001");
});
