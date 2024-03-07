import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "food",
  },
  drink: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "drink",
  },
});

const menuModel = mongoose.model("menu", MenuSchema);
export default menuModel;
