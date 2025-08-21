import express from "express";
import {
  checkAvailabilityAPI,
  createBooking,
  getHotelBookings,
  getUserBookings,
} from "../controllers/bookingController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/check-availability", checkAvailabilityAPI);
router.post("/book", protect, createBooking);
router.get("/user", protect, getUserBookings);
router.get("/hotel", protect, getHotelBookings);

export default router;
