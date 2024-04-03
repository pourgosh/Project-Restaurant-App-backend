import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminModel from "../Models/Admin.model.js";
import { authenticator } from "../Middleware/auth.middleware.js";

const adminRoutes = express.Router();

adminRoutes.post("/admin/register", async (req, res) => {
  try {
    const newAdmin = req.body;
    const isAdminInDb = await adminModel.findOne({ email: newAdmin.email });
    if (isAdminInDb) {
      res.json("Admin already exists");
    }
    const hashedPassword = await bcrypt.hash(newAdmin.password, 10);
    const createAdmin = await new adminModel({
      ...newAdmin,
      password: hashedPassword,
    });
    await createAdmin.save();
    res.json({ msg: "Admin creation successful", createAdmin });
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

adminRoutes.post("/admin/login", async (req, res) => {
  try {
    const newAdmin = req.body;
    const isAdminInDb = await adminModel.findOne({ email: newAdmin.email });
    if (!isAdminInDb) {
      res.json("Admin doesnt exists");
    }
    const isPassValid = await bcrypt.compare(
      newAdmin.password,
      isAdminInDb.password
    );
    if (!isPassValid) {
      return res.json("email or password is incorrect");
    }
    const token = await jwt.sign({ _id: isAdminInDb._id }, process.env.SECRET);
    if (!token) {
      return res.json("Token creation failed");
    }
    res.json({
      message: "Login was successful",
      token,
      AdminID: isAdminInDb._id,
    });
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

adminRoutes.get("/admin", authenticator, async (req, res) => {
  try {
    const adminsInDb = await adminModel.find();
    res.json(adminsInDb);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

adminRoutes.get("/admin/:_id", authenticator, async (req, res) => {
  try {
    const adminID = req.params;
    const adminInDb = await adminModel.findById(adminID);
    res.json(adminInDb);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

adminRoutes.put("/admin/:_id", authenticator, async (req, res) => {
  try {
    const adminID = req.params;
    const updatedData = req.body;
    const adminInDb = await adminModel.findByIdAndUpdate(adminID, updatedData, {
      new: true,
    });
    res.json({ msg: "update successful", adminInDb });
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

adminRoutes.delete("/admin/:_id", authenticator, async (req, res) => {
  try {
    const adminID = req.params;
    const updatedData = await adminModel.findByIdAndDelete(adminID);
    res.json({ msg: "admin deleted successfuly" });
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

export default adminRoutes;
