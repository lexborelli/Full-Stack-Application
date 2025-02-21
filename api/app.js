'use strict';

// load environment variables from .env file
require('dotenv').config();

// load modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

const { sequelize } = require('./models');

const app = express(); 
app.use(express.json());

//Configure CORS options
const corsOption = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // react app url to go to localhost for local developement 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // enabling credentials if needed
};

//Enable CORS
app.use(cors(corsOption)); 


//access to routes.js
app.use('/api', routes);

//connect to SQLite database 

(async () => {
  try {
    // all asynchronous calls made with sequelize
    await sequelize.authenticate();
    console.log('Connection to database successful!');
    await sequelize.sync();
  } catch(error) {
    // catch and display Sequelize validation errors
    console.error('Unable to connect to the database:', error);
  }
}) ();

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';



// setup morgan which gives us http request logging
app.use(morgan('dev'));


// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
const PORT = process.env.PORT || 5000;

// start listening on our port
app.listen(PORT, '0.0.0.0', () => {  //  Modified: Added `'0.0.0.0'` to allow external connections
  console.log(`Express server is listening on port ${PORT}`); //   Updated log message
});
