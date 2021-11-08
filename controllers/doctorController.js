const { add } = require('nodemon/lib/rules');
const connectDb = require('../utils/connectionDB');
const appError = require('../utils/appError');
const encryptPass = require('../utils/encrypt');
const decryptPass = require('../utils/decrypt');
const decrypt = require('../utils/decrypt');
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
       doctor.gender = doctor.gender ===1 ? true : false;
       const params = [];
        const encrypt = new encryptPass(doctor.password);
        const hash = await encrypt.encryptFunc();
        doctor.password = hash;
       Object.values(doctor).forEach(el => params.push(el));
     

       connectDb.query(sql,params,(error,results)=>{
        if (error) throw error;
       const doctor =results[0][0];
        res.status(201).json({status:'success',message:"Thêm dữ liệu thành công",doctor});
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
        res.status(200).json({status:'success',message:message});
    })
}

exports.updatePass = (req,res) => {
    const id = req.params.doctorId;
    const newpass = req.body.newPass;
    console.log(newpass);
    const encrypt = new encryptPass(newpass);
    const newPassEncrypth= encrypt.encryptFunc();
    const sql = "call Update_Password_Doctor_Proc(?,?)";
    connectDb.query(sql,[newPassEncrypth,id],(error)=>{
        if(error) throw error;
        res.status(200).json({status:"success",message:"Cập nhật mật khẩu thành công"});
    })
}
exports.checkExistPass = (req,res,next) => {
     const id = req.params.doctorId;
    const newPass = req.body.newPass;
    const oldPass = req.body.oldPass;
    let oldPassDb = "";
   

            
              decryptFromDB(id).then(val => {
                  console.log(val);
              })
           
        
    const sql = "select isExistPassOfDoctor_Func(?,?) as exist";
    connectDb.query(sql,[id,'abc'],(error,result) =>{
        if(error) throw error;
       ({exist,...rest}=result[0]);
        if(exist === 1){
            if(oldPass === newPass) {
                const appErr = new appError(409,"Mật khẩu mới trùng mật cũ");
            res.status(appErr.statusCode).send(appErr.resError().error);
            } else{
                next();
            }
        }
        else {
            const appErr = new appError(409,"Nhập sai mật khẩu");
            res.status(appErr.statusCode).send(appErr.resError().error);
        }
    })
}

exports.checkExistUserName = (req,res,next) =>{
    const mail = req.body.mail;
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

 const decryptFromDB = (id) =>{
    const sql = "select getPassWord_Func(?) as result";
    
   connectDb.query(sql,id,(err,rs)=>{
        if(err) throw err;
        return new Promise(function(resolve,reject){
              
               resolve(rs[0].result);
        // return cbGetPassword(rs[0].result);
        })
    }
   )}