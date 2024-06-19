const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comments");

const dotenv = require("dotenv");

const cookieParser = require("cookie-parser");


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
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

app.listen(5001, () => {
  connectDB();
  console.log("Server is running on port 5001");
});
