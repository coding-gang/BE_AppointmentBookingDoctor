const req = require('express/lib/request');
const connectDb = require('../utils/connectionDB');
const appError = require('../utils/appError');
exports.getAll = (req,res,next) =>{
    let sql = "select * from ViewDoctor";

    connectDb.query(sql,(error, results, fields) =>{
    if (error) throw error;
    const doctors =results;
    res.status(200).json({status:"success",doctors:doctors});
})
}

exports.getById = (req,res)=>{
    const id =req.params.doctorId;
     let sql="call Get_doctorById_proc(?)";
     connectDb.query(sql,id,(error, results, fields) =>{
        if (error) throw error;
        const doctor =results[0];
        res.status(200).json({doctor});
    })
}

exports.update = (req,res)=>{
    const id =req.params.doctorId;
    const params = [id];
    let doctor={};
    doctor =req.body;
      Object.values(doctor).forEach(val => params.push(val));
    let sql ="call Update_Doctor_Proc(?,?,?,?,?,?,?,?,?)";
    connectDb.query(sql,params,(error, results, fields) =>{
        if (error) throw error;
        res.status(200).send({message:"Cập nhật dữ liệu thành công"});
    })
}

exports.delete = (req,res)=>{
    const id =req.params.doctorId;
     let sql =  "call Del_Doctor_Proc(?)";
     connectDb.query(sql,id,(error, results, fields) =>{
        if (error) throw error;
        const message =results[0][0].result;
        console.log(message);
        res.status(200).send({massage:"Xoá dữ liệu thành công"});
    })
}

exports.updatePass = (req,res) => {
    const id = req.params.doctorId;
    const newpass = req.body.newPass;
    console.log(newpass);
    const sql = "call Update_Password_Doctor_Proc(?,?)";
    connectDb.query(sql,[newpass,id],(error)=>{
        if(error) throw error;
        res.status(200).send({message:"Cập nhật mật khẩu thành công"});
    })
}
exports.checkExistPass = (req,res,next) => {
     const id = req.params.doctorId;
    const newpas = req.body.password;
    const sql = "select isExistPassOfDoctor_Func(?,?) as exist";
    connectDb.query(sql,[id,newpas],(error,result) =>{
        if(error) throw error;
       ({exist,...rest}=result[0]);
        if(exist ===1) next();
        else {
            const appErr = new appError(409,"Nhập sai mật khẩu");
            res.status(appErr.statusCode).send(appErr.resError().error);
        }
    })
}