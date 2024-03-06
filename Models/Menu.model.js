import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodModel",
  },
  Drink: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "drinkModel",
  },
});

const menuModel = mongoose.model("menu", MenuSchema);
export default menuModel;
