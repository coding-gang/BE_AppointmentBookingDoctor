const connectDb = require('../utils/connectionDB');
const appError = require('../utils/appError');


exports.getById = (req,res) =>{
    const appointmentId = req.params.appointmentId;
    const sql = "select * from appointmentDoctorView where appointmentId=(?)";
    connectDb.query(sql,appointmentId,(err, rs)=>{
        if(err) throw err;
        res.status(200).json({status:"success",appointment:rs})
    })
}

exports.getAllApointmentPatients = (req,res) =>{
    const sql = "select * from appointmentPatientView"
    connectDb.query(sql,(err,rs)=>{
        if (err) throw err;
        res.status(200).json({status:"success",appointments:rs})
    })
}

exports.getAllApointmentPatientsById = (req,res) =>{
    const id = req.params.id;
    const sql = "select * from appointmentPatientView where patientid=(?)"
    connectDb.query(sql,id,(err,rs)=>{
        if (err) throw err;
        res.status(200).json({status:"success",appointments:rs})
    })
}

exports.updateStatus = (req,res) =>{
    const id = req.params.id;
    ({statusId}= req.body);
    console.log(id);
    console.log(statusId);
    const sql = "update scheduleTimings set status =(?) where scheduleTimingId=(?)";
    connectDb.query(sql,[statusId,id],(err,rs)=>{
        if (err) throw err;
        res.status(200).json({status:"success",message:"Thành công!"})
    })
}

exports.getAllApointmentDoctorsById = (req,res) =>{
    const id = req.params.id;
    const sql = "select * from appointmentDoctorView where doctorId=(?)"
    connectDb.query(sql,id,(err,rs)=>{
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
exports.insert = (req,res) =>{
    const sql = "call Add_Appointments_Proc(?,?)";
     ({scheduleId, patientId}= req.body);
    connectDb.query(sql,[scheduleId, patientId],(err,rs)=>{
        if(err) throw err;
        res.status(200).json({
            status:"success",
            message:"Đặt lịch khám thành công!",
            idAppointment:rs[0][0].id
        })
    })
}

exports.update=(req,res) =>{
    const sql = "call Update_Appointments_Proc(?,?,?)";
    const appointmentId = req.params.appointmentId;
     ({scheduleId, patientId}= req.body);
     console.log(appointmentId);
    connectDb.query(sql,[appointmentId,scheduleId, patientId],(err,rs)=>{
        if(err) throw err;
        res.status(200).json({status:"success",message:"Cập nhật lịch khám thành công!"});
        })
}
exports.delete = (req,res) =>{
    const sql = "call Del_Appointments_Proc(?)";
    const appointmentId = req.params.appointmentId;
    connectDb.query(sql,appointmentId,(err,rs)=>{
        if(err) throw err;
        res.status(200).json({status:'success',message:'xoá lịch khám thành công!'});
        })
}