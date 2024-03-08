import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ingredients: [
    {
      type: String,
    },
  ],
  origin: {
    type: String,
  },
  image: {
    type: String,
  },
  chefsRecommendations: {
    type: String,
  },
  category: {
    type: String,
    enum: ["Vegetarian", "Steak", "Burger", "Finger-food", "Desert"],
  },
  price: {
    type: Number,
    required: true,
  },
});

const foodModel = mongoose.model("food", FoodSchema);
export default foodModel;
