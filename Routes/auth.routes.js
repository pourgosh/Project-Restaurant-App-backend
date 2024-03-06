import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../Models/User.model.js";

const authRoutes = express.Router();

authRoutes.post("/signup", async (req, res) => {
  try {
    const newUser = req.body;
    const isUserInDb = await userModel.findOne({ email: newUser.email });
    if (isUserInDb) {
      res.json("user already exists");
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const createUser = await new userModel({
      ...newUser,
      password: hashedPassword,
    });
    await createUser.save();
    res.json({ msg: "user creation was a success", newUser: createUser });
  } catch (err) {
    console.error(err);
  }
});

authRoutes.post("/login", async (req, res, next) => {
  try {
    const newUser = req.body;
    const isUserInDb = await userModel.findOne({ email: newUser.email });
    if (!isUserInDb) {
      return res.json("User does not exist!");
    }
    const isPassValid = bcrypt.compare(newUser.password, isUserInDb.password);
    if (!isPassValid) {
      return res.json("email or password is incorrect");
    }
    const tocken = await jwt.sign({ _id: isUserInDb._id }, process.env.SECRET);
    if (!tocken) {
      return res.json("Token creation failed");
    }
    res.json({
      message: "Login was successful",
      tocken,
      userId: isUserInDb._id,
    });
  } catch (err) {
    console.error(err);
  }
});

// authRoutes.get("/verify", async (req, res, next) => {
//   try {
//   } catch (err) {
//     console.error(err);
//     res.status(500).json("Internal Server Error");
//   }
// });

export default authRoutes;
