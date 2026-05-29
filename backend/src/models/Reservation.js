const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const passengerDetailSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  passportNumber: { type: String, required: true },
  nationality: { type: String, required: true },
  seatNumber: { type: String },
  seatClass: {
    type: String,
    enum: ["economy", "business", "first"],
    default: "economy",
  },
});

const reservationSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      unique: true,
      default: () => uuidv4().substring(0, 8).toUpperCase(),
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },
    passengers: [passengerDetailSchema],
    totalPassengers: {
      type: Number,
      required: true,
      min: 1,
    },
    seatClass: {
      type: String,
      enum: ["economy", "business", "first"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed", "refunded"],
      default: "pending",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    specialRequests: {
      type: String,
      trim: true,
    },
    checkedIn: {
      type: Boolean,
      default: false,
    },
    ticketIssued: {
      type: Boolean,
      default: false,
    },
    cancellationReason: {
      type: String,
    },
    cancelledAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reservation", reservationSchema);