const express = require('express');
const morgan = require('morgan');
const rateLimit =require('express-rate-limit'); 
const app = express();
const doctorRouter = require('./routes/doctorRoutes');

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
//limit request from client
const limit =rateLimit({
       max:100,
       windowMs: 60* 60*1000,
       message:'Too many request from this IP,please try again in an hour'
});
app.use('/api',limit);

// Body parser ,reading data from Body into  req.body
app.use(express.urlencoded({ extended: true}))

//Router
app.use('/api',doctorRouter);

module.exports =app;