const express = require('express');
const cookieParser = require('cookie-parser');
// const morgan = require('morgan');
const cors = require('cors');
const { mongoDB } = require('./database');
const passport = require('./passport');

module.exports = async (app) => {
  // Connect MongoDB
  mongoDB();

  // CORS
  const allowedOrigins = ['http://localhost:3000'];
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  };
  app.use(cors(corsOptions));

  // Parser Body
  app.use(express.json());
  app.use(cookieParser());

  // Logger
//   app.use(morgan('dev'))

  // Passport
  passport();


  // Custom Response Format
  app.use(require('../configs/responseFormat'))
}