const mongoose = require(mongoose);

const PropertySchema = new mongoose.Schema({
    property_id: {
        type: String
    },
    title: {
        type: String
    },
    address: {
        city: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        },
        zip_code: {
            type: Number
        }
    },
    host: {
        type: String
    },
    reviews: {
        type: Number
    },
    pricePerNight: {
        type: Number
    },
    cleaningFee: {
        type: Number
    },
    serviceFee: {
        type: Number
    },
    amenities: {
        type: Array
    },
    bedroom: {
        type: Number
    },
    beds: {
        type: Number
    },
    bath: {
        type: Number
    },
    images: {
        type: Array
    },
    rating: {
        type: Number
    },
    avgCost: {
        type: Number
    },
    availability: {
        type: String
    },
    distance: {
        type: String
    },
    favorite: {
        type: Boolean
    }
});

module.exports = Property = mongoose.model('property', PropertySchema);