const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Post = require("../models/Post");
const verifyToken = require("../verifyToken");

// CREATE

router.post("/write", verifyToken, async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE

router.put("/:id", verifyToken, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hashSync(req.body.password, salt);
    }
    const updatedUser = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json("Post has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET POST DETAILS

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET POSTS

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find(req.params.id);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL POSTS OF A USER

router.get("/user/:userId", async (req, res) => {
  try {
    const post = await Post.find({ userId: req.params.userId });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
