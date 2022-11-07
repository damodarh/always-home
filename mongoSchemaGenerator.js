const generateSchema = require('generate-schema');

let jsonData = {
    
};

/* {
    title: '',
    city: '',
    state: '',
    country: '',
    host: '',
    reviews: 0,
    pricePerNight: 0,
    cleaningFee: 0,
    serviceFee: 0,
    amenities: [],
    bedroom: 0,
    beds: 0,
    bath: 0,
    images: [],
    rating: 0,
    avgCost: 0,
    availability: '',
    distance: '',
    favorite: false
} */

let mongooseSchema = generateSchema.mongoose(jsonData);

console.log(JSON
    .stringify(mongooseSchema, null, " ")
    .replaceAll(
        "{,\n",
        "},\n"
    ).replaceAll('\"', ''));