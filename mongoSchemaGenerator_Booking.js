const generateSchema = require('generate-schema');

let jsonData = {
    booking_id: 0,
    title: '',
    city: '',
    guest_first_name: '',
    guest_last_name: '',
    host_first_name: '',
    host_last_name: '',
    check_in_date: '',
    check_out_date: '',
    booking_status: false
};

let mongooseSchema = generateSchema.mongoose(jsonData);

console.log(JSON
    .stringify(mongooseSchema, null, " ")
    .replaceAll(
        "{,\n",
        "},\n"
    ).replaceAll('\"', ''));