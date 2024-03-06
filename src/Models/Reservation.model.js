import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    reserver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
    time: {
      type: Date,
      required: true,
    },
    totalClients: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const reservationModel = mongoose.model("reservation", ReservationSchema);
export default reservationModel;
