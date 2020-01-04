const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// load enviromental variables
dotenv.config({
  path: './config/config.env'
});

// connect to Database
connectDB();

const app = express();

// Body Parser for accepting json data
app.use(express.json());

// enable cors
app.use(cors());

// Set static folder (where the html, css, and js are to be located)
app.use(express.static(path.join(__dirname, 'public')));

// Routes endpoints
app.use('/api/v1/stores', require('./routes/stores'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);