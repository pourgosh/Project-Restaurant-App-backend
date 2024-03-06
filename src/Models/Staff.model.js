import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema(
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
    age: {
      type: Number,
    },
    position: {
      type: String,
      enum: ["Owner", "Developer", "Staff"],
    },
  },
  { timestamps: true }
);

const staffModel = mongoose.model("staff", StaffSchema);
export default staffModel;
