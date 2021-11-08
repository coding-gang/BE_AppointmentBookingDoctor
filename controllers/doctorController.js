const connectDb = require('../utils/connectionDB');
const encryptPass = require('../utils/encrypt');
const decryptPass = require('../utils/decrypt')
const appError =require('../utils/appError')

exports.getAll = (req,res,next) =>{
    let sql = "select * from ViewDoctor";
    connectDb.query(sql,(error, results, fields) =>{
    if (error) throw error;
    const doctors =results;
    res.status(200).json({status:"success",doctors});
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
       const sql = "call Add_Doctor_Proc(?,?,?,?,?,?,?,?,?,?)";
       const doctor =  req.body;
       doctor.DOB = doctor.DOB.split("/").reverse().join("-");
       console.log(doctor);
       doctor.gender = doctor.gender ===1 ? true : false;
       const params = [];
       const encrypt = new encryptPass(doctor.password);
        const hash = await encrypt.encryptFunc();
        doctor.password = hash;
       Object.values(doctor).forEach(el => params.push(el));
       connectDb.query(sql,params,(error,results,fields)=>{
        if (error) throw error;
       const doctor =results[0][0];
        res.status(201).json({status:'success',doctor});
       })    
}

 exports.update = (req,res)=>{
    const id =req.params.doctorId
    const params = [id];
    let doctor={};
    doctor =req.body;
    doctor.dob = doctor.dob.split("/").reverse().join("-");
    doctor.gender = doctor.gender === 1 ? true : false;
    console.log(doctor);
    Object.values(doctor).forEach(val => params.push(val));
    let sql ="call Update_Doctor_Proc(?,?,?,?,?,?,?,?,?)";
    connectDb.query(sql,params,(error, results, fields) =>{
        if (error) throw error;
        const message =results[0][0].result;
         console.log(message)
        res.status(200).json({status:'success',message:message});
    })
}

exports.delete = (req,res)=>{
    const id =req.params.doctorId;
     let sql =  "call Del_Doctor_Proc(?)";
     connectDb.query(sql,id,(error, results, fields) =>{
        if (error) throw error;
        const message =results[0][0].result;
        res.status(200).json({status:'success',message:message});
    })
}

exports.updatePass = async (req,res) => {
    const id = req.params.doctorId;
    const newpass = req.body.newPass;
    console.log(newpass);
    const encrypt = new encryptPass(newpass);
    const newPassEncrypth= await encrypt.encryptFunc();
    const sql = "call Update_Password_Doctor_Proc(?,?)";
    connectDb.query(sql,[newPassEncrypth,id],(error)=>{
        if(error) throw error;
        res.status(200).json({status:"success",message:"Cập nhật mật khẩu thành công"});
    })
}

exports.checkExistPass = async (req,res,next) => {
    const id = req.params.doctorId;
    const newPass = req.body.newPass;
    const oldPass = req.body.oldPass;
    if(oldPass === newPass) {
        const appErr = new appError(409,"Mật khẩu mới trùng mật cũ");
    res.status(appErr.statusCode).send(appErr.resError().error);
    }
    const passDB = await decryptFromDB(id);
    const compareSync = new decryptPass(oldPass,passDB);
     const isPassword = await compareSync.decryptFunc();
    if(isPassword){
        next();
    }else{
        const appErr = new appError(409,"Nhập sai mật khẩu");
        res.status(appErr.statusCode).send(appErr.resError().error);
    }  
}
   
   const decryptFromDB = (id) =>{
       return new Promise((resolve,reject)=>{
        const sql = "select getPassWord_Func(?) as result";
   connectDb.query(sql,id,(err,rs)=>{
    if(err) throw err; 
           resolve(rs[0].result);
        })
   })
}

exports.checkExistUserName = (req,res,next) =>{
    const mail = req.body.mail;
    console.log(mail)
    const sql = "select isExist_UsernameFromDoctor_Func(?) as isExist";
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