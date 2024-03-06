import express from "express";
import foodModel from "../Models/Food.model.js";
import { authenticator } from "../Middleware/auth.middleware.js";

const foodRoutes = express.Router();

foodRoutes.post("/food", authenticator, async (req, res) => {
  try {
    const newFood = req.body;
    const createFood = await new foodModel(newFood);
    await createFood.save();
    res.json({ msg: "Food creation successful", createdFood: createFood });
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

foodRoutes.get("/food", async (req, res) => {
  try {
    const foodsInDb = await foodModel.find();
    res.json(foodsInDb);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

foodRoutes.get("/food/:_id", async (req, res) => {
  try {
    const foodID = req.params;
    const foodInDb = await foodModel.findById(foodID);
    res.json(foodInDb);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

foodRoutes.put("/food/:_id", authenticator, async (req, res) => {
  try {
    const foodID = req.params;
    const updatedData = req.body;
    const foodInDb = await foodModel.findByIdAndUpdate(foodID, updatedData, {
      new: true,
    });
    res.json(foodInDb);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

foodRoutes.delete("/food/:_id", authenticator, async (req, res) => {
  try {
    const foodID = req.params;
    const updatedData = req.body;
    const foodInDb = await foodModel.findByIdAndDelete(foodID, updatedData);
    res.json({ msg: "item was delete", foodInDb });
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

export default foodRoutes;
