const connectDb = require('../utils/connectionDB');
const encryptPass = require('../utils/encrypt');
const decryptPass = require('../utils/decrypt');
const appError =require('../utils/appError');
const jwt = require('jsonwebtoken');

exports.getAll = (req,res) =>{
    let sql = "select * from patientView";
    connectDb.query(sql,(error, results) =>{
    if (error) throw error;
    const patients =results;
    res.status(200).json({status:"success",patients});
})
}

exports.getById = (req,res)=>{
    console.log(req.query);
    const id =req.params.doctorId;
     let sql="call getDetailDoctotById_proc(?)";
     connectDb.query(sql,id,(error, results, fields) =>{
        if (error) throw error;
        const doctors =results[0];   
        console.log(doctors)    
        res.status(200).json({doctors});
    })
}
exports.Add = async (req,res)=>{
       const sql = "call Add_Patient_Proc(?,?,?,?,?,?,?)";
       const patient =  req.body;
       console.log(patient);
    //    patient.gender = patient.gender ===1 ? true : false;
       const params = [];
       const encrypt = new encryptPass(patient.password);
        const hash = await encrypt.encryptFunc();
        patient.password = hash;
       Object.values(patient).forEach(el => params.push(el));
       console.log(params);
       connectDb.query(sql,params,(error,results)=>{
        if (error) throw error;
       const dataPatient =results[0][0];
        res.status(201).json({status:'success',messafe:"Thêm bệnh nhân thành công!",dataPatient});
       })    
}

 exports.update = (req,res)=>{
    const id =req.params.patientId;
    const params = [id];
  const  patient =req.body;
    Object.values(patient).forEach(val => params.push(val));
    let sql ="call Update_Patient_Proc(?,?,?,?,?)";
    connectDb.query(sql,params,(error, result) =>{
        if (error) throw error;
        const patientUpdated = result[0][0];
        console.log(result);
        res.status(200).json({status:'success',message:"Cập nhật dữ liệu thành công", patientUpdated});
    })
}

exports.delete = (req,res) =>{
    const param = req.params.patientId;
    console.log(param);
    const sql = "call Del_Patient_Proc(?)";
    connectDb.query(sql,param,(error)=>{
        if(error) throw error;
        res.status(200).json({status:"success",message:"Xoá dữ liệu thành công"});
    })
}


exports.updatePass = async (req,res) => {
    const id = req.params.patientId;
    const newpass = req.body.newPass;
    
    const encrypt = new encryptPass(newpass);
    const newPassEncrypth= await encrypt.encryptFunc();
    const sql = "call Update_Password_Patient_Proc(?,?)";
    connectDb.query(sql,[newPassEncrypth,id],(error)=>{
        if(error) throw error;
        res.status(200).json({status:"success",message:"Cập nhật mật khẩu thành công"});
    })
}

exports.checkExistPass = async (req,res,next) => {
    const id = req.params.patientId;
    const newPass = req.body.newPass;
    const oldPass = req.body.oldPass;
    if(oldPass === newPass) {
        const appErr = new appError(409,"Mật khẩu mới trùng mật cũ");
    res.status(appErr.statusCode).send(appErr.resError().error);
    }
    else {
        const passDB = await decryptFromDB(id);
      console.log(passDB.length);
    const compareSync = new decryptPass(oldPass,passDB);
    console.log(compareSync.encryptText,compareSync.hash);
     const isPassword = await compareSync.decryptFunc();
   
    if(isPassword){
        next();
    }else{
        const appErr = new appError(409,"Nhập sai mật khẩu");
        res.status(appErr.statusCode).send(appErr.resError().error);
    }  

    }
}
   const decryptFromDB = (id) =>{
       return new Promise((resolve,reject)=>{
        const sql = "select getPassWord_Patient_Func(?) as result";
   connectDb.query(sql,id,(err,rs)=>{
    if(err) throw err; 
           resolve(rs[0].result);
        })
   })
}

exports.checkExistUserName = (req,res,next) =>{
    const mail = req.body.username;
    console.log(mail)
    const sql = "select isExist_UsernameFromPatient_Func(?) as isExist";
    connectDb.query(sql,mail,(err, result) =>{
        if(err) throw err;
        ({isExist,...rest} = result[0]);
        if(isExist === 0) next();
        else {
             const appErr = new appError(409,`Đã tồn tại người dùng: ${mail}`);
            res.status(appErr.statusCode).send(appErr.resError().error);
        }
    })
}

exports.login= async(req,res)=>{
                const username = req.body.username;
                const passClient = req.body.pass;
                const sql ="call getDetailPatientByUsername_proc(?)";
            connectDb.query(sql,username,async(err,result)=>{
                if(err) throw err;
                console.log(result);
               if(result[0].length > 0){
                   [{patientId, userName, firstname,lastname,nameRole, password}] =[...result[0]];
                const decrypt = new decryptPass(passClient,password);
                const isPatient =  await decrypt.decryptFunc();
                const patient = {
                  patientId, userName, firstname,lastname,nameRole, password
                    }
                   if(isPatient){
                     const privateKey = process.env.KEY_SECRET;
                     const audience = process.env.AUDIENCE;
                     const issuer = process.env.ISSUER;
                     const token = await jwt.sign(patient,privateKey,{audience,issuer, expiresIn:"60s" });
                          res.status(200)
                              .json({status:"success",message:"Đăng nhập thành công",token})
                   }else{
                     const appErr = new appError(404,`Password không đúng`);
                     res.status(appErr.statusCode).json(appErr.resError().error);
                   }
               }else{
                 const appErr = new appError(404,`Tên người dùng: ${username} không tồn tại`);
                 res.status(appErr.statusCode).json(appErr.resError().error);
               }
            })
}


exports.checkExistPatient = (req, res, next)  =>{
    const param = req.params.patientId;
    const sql = "select isExist_AppointmentFromPatient_Func(?) as isExistPatient";
    connectDb.query(sql,param,(error,result)=>{
        if(error) throw error;
        [{isExistPatient}] = [...result]
        if(isExistPatient===0) next();
        else{
             const err =  new appError(409,"Không thể xoá bệnh nhân này!");
            res.status(err.statusCode).json(err.resError().error);
        }
    })
}
