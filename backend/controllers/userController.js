import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt, { genSalt } from "bcrypt";
import validator from "validator";
import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../errors/customErrors.js";

//login user
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError("User doesn't exist");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthenticatedError("invalid credentials");
    }
    const token = createToken(user._id);
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + oneDay),
    });
    res.status(200).json({ success: true, message: "User logged in" });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "Error" });
  }
};

//register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    //validating email format and strong pass
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    //hashing user pass
    const salt = await genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res
      .status(StatusCodes.CREATED)
      .json({ success: true, message: "User registered" });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "Error" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id); // Use req.user from authenticateUser middleware
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, name: user.name });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { loginUser, registerUser, getUserDetails };
