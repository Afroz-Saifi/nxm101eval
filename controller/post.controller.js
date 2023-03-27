const { postModel } = require("../model/post.model");
const jwt = require("jsonwebtoken");

const newPost = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "fw24_605");
  req.body.userId = decoded.userId;
  //   console.log(req.body);
  try {
    const postData = new postModel(req.body);
    await postData.save();
    return res.status(201).json({ msg: "new post added successfully" });
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

const getPosts = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "fw24_605");
  const userId = decoded.userId;
  const min = req.query.min || -Infinity;
  const max = req.query.max || Infinity;
  const filter = {
    userId,
    no_of_comments: { $lt: max },
    no_of_comments: { $gt: min }
  };

  try {
    const postsData = await postModel.find({userId, $and: [{no_of_comments: {$lt: max}}, {no_of_comments: {$gt: min}}]}).limit(3);
    if (postsData.length > 0) {
      return res.status(200).json(postsData);
    } else {
      return res.status(404).json({ msg: "no posts available for this user" });
    }
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "fw24_605");
  const userId = decoded.userId;
  //   console.log(id);
  try {
    const updateData = await postModel.findOneAndUpdate(
      { _id: id, userId },
      req.body
    );
    return res.status(200).json({ msg: "post updated successfully" });
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "fw24_605");
  const userId = decoded.userId;
  //   console.log(id);
  try {
    const updateData = await postModel.findOneAndDelete({ _id: id, userId });
    return res.status(200).json({ msg: "post deleted successfully" });
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "fw24_605");
  const userId = decoded.userId;
  try {
    const post = await postModel.findOne({ _id: id, userId });
    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(404).json({ msg: "post not found" });
    }
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

module.exports = { newPost, getPosts, updatePost, deletePost, getPost };
