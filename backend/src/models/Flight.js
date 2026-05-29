const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true },
  class: {
    type: String,
    enum: ["economy", "business", "first"],
    default: "economy",
  },
  isAvailable: { type: Boolean, default: true },
  price: { type: Number, required: true },
});

const flightSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: String,
      required: [true, "Flight number is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    airline: {
      type: String,
      required: [true, "Airline name is required"],
      trim: true,
    },
    origin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: [true, "Origin destination is required"],
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: [true, "Destination is required"],
    },
    departureTime: {
      type: Date,
      required: [true, "Departure time is required"],
    },
    arrivalTime: {
      type: Date,
      required: [true, "Arrival time is required"],
    },
    duration: {
      type: Number, // in minutes
    },
    status: {
      type: String,
      enum: ["scheduled", "delayed", "cancelled", "completed", "boarding"],
      default: "scheduled",
    },
    aircraft: {
      type: String,
      trim: true,
    },
    totalSeats: {
      type: Number,
      required: [true, "Total seats is required"],
    },
    availableSeats: {
      economy: { type: Number, default: 0 },
      business: { type: Number, default: 0 },
      first: { type: Number, default: 0 },
    },
    pricing: {
      economy: { type: Number, required: true },
      business: { type: Number, required: true },
      first: { type: Number, required: true },
    },
    seats: [seatSchema],
    baggage: {
      carryOn: { type: Number, default: 7 },  // kg
      checked: { type: Number, default: 23 },  // kg
    },
    amenities: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-calculate duration before save
flightSchema.pre("save", function (next) {
  if (this.departureTime && this.arrivalTime) {
    this.duration = Math.round(
      (this.arrivalTime - this.departureTime) / (1000 * 60)
    );
  }
  next();
});

module.exports = mongoose.model("Flight", flightSchema);