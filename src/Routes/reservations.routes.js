import express from "express";
import ReservationModel from "../Models/Reservation.model.js";
import { authenticator } from "../Middleware/auth.middleware.js";

const reservationRoutes = express.Router();

reservationRoutes.post("/reservation", authenticator, async (req, res) => {
  try {
    const newReservation = req.body;
    const reservationInDb = await new ReservationModel(newReservation);
    await reservationInDb.save();
    res.json("reservation successful");
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

reservationRoutes.get("/reservation", authenticator, async (req, res) => {
  try {
    const reservationsInDb = await ReservationModel.find().populate("reserver");
    res.json(reservationsInDb);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

reservationRoutes.get("/reservation/:_id", authenticator, async (req, res) => {
  try {
    const reservationID = req.params;
    const reservationsInDb = await ReservationModel.findById(
      reservationID
    ).populate("reserver");
    res.json(reservationsInDb);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

reservationRoutes.put("/reservation/:_id", authenticator, async (req, res) => {
  try {
    const reservationID = req.params;
    const updatedData = req.body;
    const reservationsInDb = await ReservationModel.findByIdAndUpdate(
      reservationID,
      updatedData,
      { new: true }
    );
    res.json({ msg: "update successful", reservationsInDb });
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

reservationRoutes.delete(
  "/reservation/:_id",
  authenticator,
  async (req, res) => {
    try {
      const reservationID = req.params;
      const reservationsInDb = await ReservationModel.findByIdAndDelete(
        reservationID
      );
      res.json({ msg: "delete successful", reservationsInDb });
    } catch (err) {
      console.error(err);
      res.json(err);
    }
  }
);

export default reservationRoutes;
