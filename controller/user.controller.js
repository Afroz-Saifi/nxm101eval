const bcrypt = require("bcryptjs");
const { userModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const hashPass = bcrypt.hashSync(`${req.password}`, 9);
//   req.body.password = hashPass;
  try {
    const userData = new userModel(req.body);
    await userData.save();
    return res.status(201).json({ msg: "user registered successfully" });
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await userModel.findOne({ email });
    if (data) {
      const pass = data.password;
      //   bcrypt.compare(password, pass, (err, code) => {
      //       if (code) {
      //         return res.status(200).json({
      //           msg: "loged in success",
      //           token: jwt.sign({ userId: data._id }, "fw24_605"),
      //         });
      //       } else {
      //         return res.status(400).json({ err: "incorrect password" });
      //       }
      //   })
      if (password==pass) {
        return res.status(200).json({
          msg: "loged in success",
          token: jwt.sign({ userId: data._id }, "fw24_605"),
        });
      } else {
        return res.status(400).json({ err: "incorrect password" });
      }
    } else {
      return res.status(400).json({ msg: "invalid email" });
    }
  } catch (error) {
    return res.status(404).json({ err: error });
  }
};

module.exports = { registerUser, loginUser };
