const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        //required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isHost: {
        type: Boolean,
    },
    host_location: {
        type: String,
    },
    host_description: {
        type: String,
    },
    register_date: {
        type: Date,
        default: Date.now,
    },
    ssn: {
        type: Number,
    },
    address: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        country: {
            type: String,
        },
        zip_code: {
            type: Number,
        },
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = User = mongoose.model('user', UserSchema);
