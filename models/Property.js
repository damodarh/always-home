const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
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
  amenities: {
    type: Array,
  },
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
  availability: {
    type: String,
  },
  distance: {
    type: Number,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

module.exports = Property = mongoose.model("property", PropertySchema);
