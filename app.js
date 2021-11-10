const express = require('express');
const morgan = require('morgan');
const rateLimit =require('express-rate-limit'); 
const app = express();
const doctorRouter = require('./routes/doctorRoutes');
const passport =require('passport');
const cors = require('cors');
const specialitieRouter = require('./routes/specialitiesRouters');
const adminRouter = require('./routes/adminRouter');

app.use(cors());
require('./passport')(passport)
app.use(passport.initialize())


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

// Body parser ,reading data from Body into  req.body
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//limit request from client 1 hour
// const limit =rateLimit({
//        max:100,
//        windowMs: 60* 60*1000,
//        message:'Too many request from this IP,please try again in an hour'
// });


//app.use('/api',limit);

//Router
app.use('/api/v1',doctorRouter);


//Router
app.use('/api/v1',doctorRouter);
app.use('/api/v1',specialitieRouter);
app.use('/api/v1',adminRouter);

module.exports =app;
