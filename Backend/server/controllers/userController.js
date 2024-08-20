const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
// get users
const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      res.status(400);
      throw new Error("user not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
// create users
const createUser = async (req, res, next) => {
  try {
    const { password, ...rest } = req.body;
    // generate salt
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ ...rest, password: hashedPassword });
    if (!user) {
      res.status(400);
      throw new Error("user not created");
    }
    //dont return password to user
    //hash the password before saving to database
    const { password: userpassword, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (error) {
    next(error);
  }
};
// login user
const userLogIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("user not found");
    }
    //compare password
    const isCompare = bcrypt.compare(password, user.password);
    if (!isCompare) {
      res.status(400);
      throw new Error("incorrect password");
    }
    //generate the token
    //set the cookie
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.cookie("jwt", token);
    const { password: userpassword, ...rest } = user._doc;
    console.log(token);
    return res.status(200).json({ ...rest });
  } catch (error) {
    next(error);
  }
};
const logoutUser = async (req, res, next) => {
  res.cookie("jwt", "", { expiresIn: "-1" });
  return res.json({ message: "you have been logedout" });
};
module.exports = { getUsers, createUser, userLogIn, logoutUser };
