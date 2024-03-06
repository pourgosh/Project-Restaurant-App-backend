import express from "express";
import menuModel from "../Models/Menu.model.js";
import { authenticator } from "../Middleware/auth.middleware.js";

const menuRoutes = express.Router();

menuRoutes.post("/menu", authenticator, async (req, res) => {
  try {
    const newItem = req.body;
    const newitemInDb = await new menuModel(newItem);
    await newitemInDb.save();
    res.json({ msg: "item creation was a success", newitemInDb });
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

menuRoutes.get("/menu", async (req, res) => {
  try {
    const itemsInDb = await menuModel.find(); /*.populate(["food", "drink"])*/

    res.json(itemsInDb);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

menuRoutes.get("/menu/:_id", async (req, res) => {
  try {
    const menuID = req.params;
    const itemInDb = await menuModel.findById(menuID);
    /*.populate(["food", "drink"])*/
    if (!itemInDb) {
      res.json("item not found");
    }
    res.json(itemInDb);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

menuRoutes.put("/menu/:_id", authenticator, async (req, res) => {
  try {
    const menuID = req.params;
    const newItem = req.body;
    const itemInDb = await menuModel.findByIdAndUpdate(menuID, newItem, {
      new: true,
    });
    res.json({ msg: "update successful", itemInDb });
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

menuRoutes.delete("/menu/:_id", authenticator, async (req, res) => {
  try {
    const menuID = req.params;
    const itemInDb = await menuModel.findByIdAndDelete(menuID, newItem);
    res.json({ msg: "item was deleted successful" });
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

export default menuRoutes;
