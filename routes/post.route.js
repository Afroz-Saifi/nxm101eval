const express = require("express");
const {
  newPost,
  getPosts,
  updatePost,
  deletePost,
  getPost,
} = require("../controller/post.controller");

const postRouter = express.Router();

postRouter.post("/add", newPost);
postRouter.get("/", getPosts);
postRouter.get("/:id", getPost);
postRouter.patch("/update/:id", updatePost);
postRouter.delete("/delete/:id", deletePost);

module.exports = { postRouter };
