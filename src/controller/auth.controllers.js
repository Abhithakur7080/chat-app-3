import { User } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/auth.utils.js";
import JWT from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!email || !fullName || !password) {
      res
        .status(400)
        .send({ success: false, message: "Please fill all required fields" });
    }
    const isAlreadyExists = await User.findOne({ email });
    if (isAlreadyExists) {
      res.status(400).send({ success: false, message: "User already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await new User({
      fullName,
      email,
      password: hashedPassword,
    }).save();

    res.status(200).send({
      success: true,
      message: "User registration successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong!!" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check email or password
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    //match password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = JWT.sign({ _id: user.id }, process.env.JWT_SECRET);
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        fullName: user.fullName,
        email: user.email,
        id: user._id,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!!",
      error,
    });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const { userId } = req.params
    const users = await User.find({ _id: {$ne: userId}});
    const userData = await Promise.all(users.map(async user => {
      return { user: {email: user.email, fullName: user.fullName, receiverId: user._id} }
    }))
    res.status(200).send({success: true, message: "All users got successfully", userData})
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong!!",
      error,
    });
  }
}