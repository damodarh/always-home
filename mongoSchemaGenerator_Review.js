const generateSchema = require('generate-schema');

let jsonData = {
    review_id: '',
    property_id: '',
    user_id: '',
    title: '',
    comments: '',
    date_Rreview: '',
    rating: 0.0
    
};

let mongooseSchema = generateSchema.mongoose(jsonData);

console.log(JSON
    .stringify(mongooseSchema, null, " ")
    .replaceAll(
        "{,\n",
        "},\n"
    ).replaceAll('\"', ''));