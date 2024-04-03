import mongoose from "mongoose";

const DrinkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
  },
  type: {
    type: String,
    enum: ["Hot", "Cold"],
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["Alcoholic", "non-Alcoholic"],
    required: true,
  },
  image: {
    type: String,
  },
});

const drinkModel = mongoose.model("drink", DrinkSchema);
export default drinkModel;
