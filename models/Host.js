const mongoose = require(mongoose);

const HostSchema = new mongoose.Schema({
    host_id: {
        type: String
    },
    host_fname: {
        type: String
    },
    host_lname: {
        type: String
    },
    property_location: {
        type: String
    },
    image: {
        type: String
    },
    verified_host: {
        type: Boolean
    }
});

module.exports = Host = mongoose.model('host', HostSchema);