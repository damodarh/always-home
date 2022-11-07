const mongoose = require(mongoose);

const BookingSchema = new mongoose.Schema({
    booking_id: {
        type: Number
    },
    title: {
        type: String
    },
    city: {
        type: String
    },
    guest_first_name: {
        type: String
    },
    guest_last_name: {
        type: String
    },
    host_first_name: {
        type: String
    },
    host_last_name: {
        type: String
    },
    check_in_date: {
        type: String
    },
    check_out_date: {
        type: String
    },
    booking_status: {
        type: Boolean
    }
});

module.exports = Booking = mongoose.model('reservation', BookingSchema);