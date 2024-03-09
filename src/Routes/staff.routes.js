import express from "express";
import staffModel from "../Models/Staff.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticator } from "../Middleware/auth.middleware.js";

const staffRoutes = express.Router();

staffRoutes.post("/staff/register", async (req, res) => {
  try {
    const newStaff = req.body;
    const isStaffInDb = await staffModel.findOne({ email: newStaff.email });
    if (isStaffInDb) {
      res.json("Staff member already exists");
    }
    const hashedPassword = await bcrypt.hash(newStaff.password, 10);
    const createStaff = await new staffModel({
      ...newStaff,
      password: hashedPassword,
    });
    await createStaff.save();
    res.json({ msg: "Staff creation was a success", newStaff: createStaff });
  } catch (err) {
    console.error(err);
    res.json("error creating staff member");
  }
});

staffRoutes.post("/staff/login", async (req, res, next) => {
  try {
    const newStaff = req.body;
    const isStaffInDb = await staffModel.findOne({ email: newStaff.email });
    if (!isStaffInDb) {
      return res.json("User does not exist!");
    }

    const isPassValid = await bcrypt.compare(
      newStaff.password,
      isStaffInDb.password
    );
    if (!isPassValid) {
      return res.json("email or password is incorrect");
    }
    const token = await jwt.sign({ _id: isStaffInDb._id }, process.env.SECRET);
    if (!token) {
      return res.json("Token creation failed");
    }
    res.json({
      message: "Login was successful",
      token,
      staffMemberId: isStaffInDb._id,
    });
  } catch (err) {
    console.error(err);
  }
});

staffRoutes.get("/staff", authenticator, async (req, res, next) => {
  try {
    const staffInDb = await staffModel.find();
    if (!staffInDb) {
      return res.json("Staffs not found");
    }
    res.json(staffInDb);
  } catch (err) {
    console.error(err);
  }
});

staffRoutes.get("/staff/:_id", authenticator, async (req, res, next) => {
  try {
    const staffID = req.params;
    const staffInDb = await staffModel.findById(staffID);
    if (!staffInDb) {
      return res.json("Staff member not found");
    }
    res.json(staffInDb);
  } catch (err) {
    console.error(err);
  }
});

staffRoutes.put("/staff/:_id", authenticator, async (req, res, next) => {
  try {
    const staffID = req.params;
    const updatedInfo = req.body;
    const staffInDb = await staffModel.findByIdAndUpdate(staffID, updatedInfo, {
      new: true,
    });
    res.json({ msg: "update successful", data: staffInDb });
  } catch (err) {
    console.error(err);
  }
});

staffRoutes.delete("/staff/:_id", authenticator, async (req, res, next) => {
  try {
    const staffID = req.params;
    const staffInDb = await staffModel.findByIdAndDelete(staffID);
    res.json({ msg: "Staff Member deleted", date: staffInDb });
  } catch (err) {
    console.error(err);
  }
});
export default staffRoutes;
