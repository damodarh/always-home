const generateSchema = require('generate-schema');

let jsonData = {
    user_id: '',
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    host: '',
    ssn: 0,
    address: {
        street: '',
        city: '',
        country: '',
        zip_code: 0,
    },
    password: ''
};

let mongooseSchema = generateSchema.mongoose(jsonData);

console.log(JSON
    .stringify(mongooseSchema, null, " ")
    .replaceAll(
        "{,\n",
        "},\n"
    ).replaceAll('\"', ''));