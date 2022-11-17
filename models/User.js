const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
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
  host: {
    type: String,
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

module.exports = User = mongoose.model("user", UserSchema);
