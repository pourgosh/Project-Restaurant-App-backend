import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  test: String,
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "food",
  },
  Drink: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "drink",
  },
});

const menuModel = mongoose.model("menu", MenuSchema);
export default menuModel;
