const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'property',
    },
    title: {
        type: String
    },
    city: {
        type: String
    },
    guestName: {
        type: String
    },
    hostName: {
        type: String
    },
    checkinDate: {
        type: String
    },
    checkoutDate: {
        type: String
    },
    bookingStatus: {
        type: String
    }
});

module.exports = Booking = mongoose.model('bookings', BookingSchema);