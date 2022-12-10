const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect to DB
connectDB();

//Init middleware, this allows us to get data from req.body
app.use(express.json({ extended : false}));

app.get('/', ((req, res) => { res.send('API running') }));

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/properties', require('./routes/api/properties'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/bookings', require('./routes/api/bookings'));

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));