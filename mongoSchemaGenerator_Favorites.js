const generateSchema = require('generate-schema');

let jsonData = {
    title: '',
    date_of_creation: '',
    property: []
};

let mongooseSchema = generateSchema.mongoose(jsonData);

console.log(JSON
    .stringify(mongooseSchema, null, " ")
    .replaceAll(
        "{,\n",
        "},\n"
    ).replaceAll('\"', ''));