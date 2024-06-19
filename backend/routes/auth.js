const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json("User not found");
    }
    const matchPass = await bcrypt.compare(req.body.password, user.password);
    if (!matchPass) {
      return res.status(400).json("Wrong password");
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "3d",
    });

    const { password, ...info } = user._doc;
    res.cookie("token", token).status(200).json({ token, info });

    // res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGOUT

router.get("/logout", async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .json({ message: "Logged out" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
