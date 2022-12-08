const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
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
    zip_code: {
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
            image: {
                data: Buffer,
                contentTye: String,
            },
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

module.exports = Property = mongoose.model('property', PropertySchema);
