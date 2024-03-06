import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
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
      type: Number,
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
    position: {
      type: String,
      enum: ["Owner", "Developer", "Staff"],
      required: true,
    },
  },
  { timestamps: true }
);

const adminModel = mongoose.model("admin", AdminSchema);
export default adminModel;
