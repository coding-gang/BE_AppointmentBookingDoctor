const connectDb = require('../utils/connectionDB');
const appError = require('../utils/appError');


exports.getAllApointmentPatients = (req,res) =>{
    const sql = "select * from appointmentPatientView"
    connectDb.query(sql,(err,rs)=>{
        if (err) throw err;
        res.status(200).json({status:"success",appointments:rs})
    })
}

exports.getAllApointmentDoctors = (req,res) =>{
    const sql = "select * from appointmentDoctorView"
    connectDb.query(sql,(err,rs)=>{
        if (err) throw err;
        res.status(200).json({status:"success",appointments:rs})
    })
}