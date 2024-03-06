import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    reserver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    time: {
      type: Date,
    },
    totalClients: {
      type: Number,
      min: 1,
      max: 10,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

const reservationModel = mongoose.model("reservation", ReservationSchema);
export default reservationModel;
