const mongoose = require(mongoose);

const UserSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    host: {
        type: String
    },
    ssn: {
        type: Number
    },
    address: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        },
        zip_code: {
            type: Number
        }
    },
    password: {
        type: String
    }
});

module.exports = User = mongoose.model('user', UserSchema);