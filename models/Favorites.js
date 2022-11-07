const mongoose = require(mongoose);

const FavoritesSchema = new mongoose.Schema({
    title: {
        type: String
    },
    date_of_creation: {
        type: String
    },
    property: {
        type: Array
    }
});

module.exports = Favorites = mongoose.model('favorites', FavoritesSchema);