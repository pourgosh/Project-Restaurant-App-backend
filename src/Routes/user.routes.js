import express from "express";
import userModel from "../Models/User.model.js";
import { authenticator } from "../Middleware/auth.middleware.js";

const userRoutes = express.Router();

userRoutes.get("/users", authenticator, async (req, res) => {
  try {
    const usersInDb = await userModel.find();
    if (!usersInDb) {
      return res.json("no users found");
    }
    res.json(usersInDb);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

userRoutes.get("/users/:_id", authenticator, async (req, res) => {
  try {
    const userID = req.params;
    const userInDb = await userModel.findById(userID);
    if (!userInDb) {
      return res.json("no user found");
    }
    res.json(userInDb);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

userRoutes.put("/users/:_id", authenticator, async (req, res) => {
  try {
    const userID = req.params;
    const newData = req.body;
    const userInDb = await userModel.findByIdAndUpdate(userID, newData, {
      new: true,
    });
    res.json({ msg: "update successful", userInDb });
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

userRoutes.delete("/users/:_id", authenticator, async (req, res) => {
  try {
    const userID = req.params;
    const userInDb = await userModel.findByIdAndDelete(userID);
    res.json({ msg: "user profile deleted successfuly" });
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

export default userRoutes;
