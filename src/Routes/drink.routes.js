import express from "express";
import drinkModel from "../Models/Drink.model.js";
import { authenticator } from "../Middleware/auth.middleware.js";

const drinkRoutes = express.Router();

drinkRoutes.post("/drink", authenticator, async (req, res) => {
  try {
    const newDrink = req.body;
    const createDrink = await new drinkModel(newDrink);
    await createDrink.save();
    res.json({ msg: "Drink creation successful", createDrink });
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

drinkRoutes.get("/drink", async (req, res) => {
  try {
    const drinksInDb = await drinkModel.find();
    res.json(drinksInDb);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

drinkRoutes.get("/drink/:_id", async (req, res) => {
  try {
    const drinkID = req.params;
    const drinkInDb = await drinkModel.findById(drinkID);
    res.json(drinkInDb);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

drinkRoutes.put("/drink/:_id", async (req, res) => {
  try {
    const drinkID = req.params;
    const updatedData = req.body;
    const drinkInDb = await drinkModel.findByIdAndUpdate(drinkID, updatedData, {
      new: true,
    });
    res.json({ msg: "update successful", drinkInDb });
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

drinkRoutes.delete("/drink/:_id", async (req, res) => {
  try {
    const drinkID = req.params;
    const drinkInDb = await drinkModel.findByIdAndDelete(drinkID);
    res.json({ msg: "drink deleted successfuly" });
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

export default drinkRoutes;
