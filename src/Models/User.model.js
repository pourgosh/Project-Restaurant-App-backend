import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    description: {
      type: String,
    },
    age: {
      type: Number,
    },
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
      },
    ],
    reservations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reservation",
      },
    ],
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", UserSchema);
export default userModel;
