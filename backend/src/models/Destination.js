const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    airportName: {
      type: String,
      required: [true, "Airport name is required"],
      trim: true,
    },
    airportCode: {
      type: String,
      required: [true, "Airport code is required"],
      uppercase: true,
      trim: true,
      unique: true,
      maxlength: [4, "Airport code cannot exceed 4 characters"],
    },
    timezone: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Destination", destinationSchema);