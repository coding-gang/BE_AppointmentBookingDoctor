const express = require('express');
const morgan = require('morgan');
const rateLimit =require('express-rate-limit'); 
const app = express();
const doctorRouter = require('./routes/doctorRoutes');


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

// Body parser ,reading data from Body into  req.body
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//limit request from client 1 hour
const limit =rateLimit({
       max:3,
       windowMs: 60*1000,
       message:'Too many request from this IP,please try again in an hour'
});
app.use('/api',limit);

//Router
app.use('/api/v1',doctorRouter);

module.exports =app;