const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
  },

  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  zipCode: {
    type: Number,
  },
  host: {
    type: String,
  },
  reviews: {
    type: Number,
  },
  pricePerNight: {
    type: Number,
  },
  cleaningFee: {
    type: Number,
  },
  serviceFee: {
    type: Number,
  },
  amenities: [
    {
      type: String,
    },
  ],
  bedroom: {
    type: Number,
  },
  beds: {
    type: Number,
  },
  bath: {
    type: Number,
  },
  images: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
  rating: {
    type: Number,
  },
  avgCost: {
    type: Number,
  },
  available: {
    type: Boolean,
    default: true,
  },
  distance: {
    type: Number,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = Property = mongoose.model("property", PropertySchema);
