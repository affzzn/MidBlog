const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comments");

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

// Load environment variables from .env file
dotenv.config();

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};

// Middleware
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ["https://midblog.netlify.app"];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

// Serve static files
app.use("/images", express.static(path.join(__dirname, "/images")));

// Image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.img);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    console.log("File uploaded:", req.file);
    res.status(200).json("Image has been uploaded");
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json("Error uploading image");
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

//
//

// const express = require("express");
// const { default: mongoose } = require("mongoose");
// const app = express();
// const authRouter = require("./routes/auth");
// const userRouter = require("./routes/users");
// const postRouter = require("./routes/post");
// const commentRouter = require("./routes/comments");

// const dotenv = require("dotenv");

// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// const multer = require("multer");
// const path = require("path");

// // database

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URL);
//     console.log("MongoDB is connected");
//   } catch (error) {
//     console.log(error);
//   }
// };

// //middlewares

// dotenv.config();
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({ credentials: true, origin: "http://midblog.netlify.app" }));
// app.use("/api/auth", authRouter);
// app.use("/api/users", userRouter);
// app.use("/api/posts", postRouter);
// app.use("/api/comments", commentRouter);

// app.use("/images", express.static(path.join(__dirname, "/images")));

// // Image upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.img);
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     console.log("File uploaded:", req.file);
//     res.status(200).json("Image has been uploaded");
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     res.status(500).json("Error uploading image");
//   }
// });

// const PORT = process.env.PORT || 5001;

// app.listen(PORT, () => {
//   connectDB();
//   console.log("Server is running on port 5001");
// });
