const mongoose = require(mongoose);

const ReviewSchema = new mongoose.Schema({
    review_id: {
        type: String
    },
    property_id: {
        type: String
    },
    user_id: {
        type: String
    },
    title: {
        type: String
    },
    comments: {
        type: String
    },
    date_review: {
        type: String
    },
    rating: {
        type: Number
    }
});

module.exports = Review = mongoose.model('review', ReviewSchema);