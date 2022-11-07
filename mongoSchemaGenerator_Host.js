const generateSchema = require('generate-schema');

let jsonData = {
    host_id: '',
    host_fname: '',
    host_lname: '',
    property_location: '',
    image: '',
    verified_host: false
};

let mongooseSchema = generateSchema.mongoose(jsonData);

console.log(JSON
    .stringify(mongooseSchema, null, " ")
    .replaceAll(
        "{,\n",
        "},\n"
    ).replaceAll('\"', ''));