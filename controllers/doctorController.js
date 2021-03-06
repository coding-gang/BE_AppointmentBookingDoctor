const connectDb = require('../utils/connectionDB');
const encryptPass = require('../utils/encrypt');
const decryptPass = require('../utils/decrypt')
const appError =require('../utils/appError');
const jwt = require('jsonwebtoken');
const APIFeatures = require('../utils/apiFeatures');
exports.getAll = async (req,res,next) =>{
    let sql = "select * from ViewDoctor";
    connectDb.query(sql,(error, results, fields) =>{
    if (error) throw error;
    const doctors =results;
    res.status(200).json({status:"success",doctors});
})
}

exports.getById = (req,res)=>{
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
        res.status(201).json({status:'success',message:"Them doctor thanh cong",doctor});
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
    const encrypt = new encryptPass(newpass);
    const newPassEncrypth= await encrypt.encryptFunc();
    const sql = "call Update_Password_Doctor_Proc(?,?)";
    connectDb.query(sql,[newPassEncrypth,id],(error)=>{
        if(error) throw error;
        res.status(200).json({status:"success",message:"C???p nh???t m???t kh???u th??nh c??ng"});
    })
}

exports.checkExistPass = async (req,res,next) => {
    const id = req.params.doctorId;
    const newPass = req.body.newPass;
    const oldPass = req.body.oldPass;
    if(oldPass === newPass) {
        const appErr = new appError(409,"M???t kh???u m???i tr??ng m???t c??");
    res.status(appErr.statusCode).json(appErr.resError().error);
    }else{
        const passDB = await decryptFromDB(id);
        const compareSync = new decryptPass(oldPass,passDB);
         const isPassword = await compareSync.decryptFunc();
        if(isPassword){
            next();
        }
       else{
            const appErr = new appError(409,"Nh???p sai m???t kh???u");
            res.status(appErr.statusCode).json(appErr.resError().error);
        }  
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
    const sql = "select isExist_UsernameFromDoctor_Func(?) as isExist";
    connectDb.query(sql,mail,(err, result) =>{
        if(err) throw err;
        ({isExist,...rest} = result[0]);
        if(isExist === 0) next();
        else {
             const appErr = new appError(409,`???? t???n t???i ng?????i d??ng: ${mail}`);
            res.status(appErr.statusCode).json(appErr.resError().error);
        }
    })
}

exports.login= async(req,res)=>{
                const email = req.body.nameOrEmail;
                const passClient = req.body.password;
                const sql ="call getDetailDoctotByEmail_proc(?)";
            connectDb.query(sql,email,async (err,result)=>{
                if(err) throw err;
               if(result[0].length >0){
                   [{doctorId,password,nameRole,firstName,lastName}] =[...result[0]];
                const decrypt = new decryptPass(passClient,password);
                const isDoctor =  await decrypt.decryptFunc();
                const doctor = {
                    doctorId,
                    firstName,
                    lastName,
                    email,
                    nameRole
                    }
                   if(isDoctor){
                     const privateKey = process.env.KEY_SECRET;
                     const audience = process.env.AUDIENCE;
                     const issuer = process.env.ISSUER;
                     const token = await jwt.sign(doctor,privateKey,{audience,issuer, expiresIn:"1h" });
                          res.status(200)
                              .json({status:"success",message:"Ch??o m???ng b???n quay l???i!",token})
                   }else{
                     const appErr = new appError(404,`Password kh??ng ????ng`);
                     res.status(appErr.statusCode).json(appErr.resError().error);
                   }
               }else{
                 const appErr = new appError(404,`Email kh??ng t???n t???i: ${email}`);
                 res.status(appErr.statusCode).json(appErr.resError().error);
               }
             })
        }
    exports.getSheduleTimings =(req,res)=>{
         res.status(200).json({status:"success",message:"ok"})
    }


    exports.getAllWithQuery = async (req, res, next) => {
        let result ={};
        if(Object.keys(req.query).length !== 0){
             if(req.query.name){
                 let name = req.query.name;
                const sql = `select * from ViewDoctor `+ 
                             `where lastName like '%${name}%' or firstName like '%${name}%' `+
                             `or speciallityName like '%${name}%' `;

             result = await queryDoctors(sql,req.query);
         
             }else{
                const sql = "select * from ViewDoctor";
                result = await queryDoctors(sql,req.query);
             }
       res.status(200).json({status:"success",doctors:result.doctors,total:result.total});
        }else{
            next();
        }
      };

      const queryDoctors = (sql,query) =>{

          return new Promise((resolve,reject) =>{
            let total =0;
            connectDb.query(sql,(error, results, fields) =>{
                if (error) return reject(error);
                  const doctors =results;
                  const fieldsDoctors = new APIFeatures(doctors,query);
                  const doctorField =  fieldsDoctors.sort().fields().limitFields();
                  total = doctorField.query.length;
                  const resultPromise = {
                    doctors:doctorField.query,
                    total:total
                  }
                  resolve(resultPromise);
               
            })
          })
      }

    exports.viewDoctorPagination = (req,res,next)=>{
        if(Object.keys(req.query).length !== 0){
            let sqlLimit;
            if(req.query.offset && req.query.limit){
                const offset =  req.query.offset;
                const limit = req.query.limit;
                if(req.query.name){
                    let name = req.query.name;
                    console.log(name);
                    sqlLimit = `select * from ViewDoctor `+ 
                                `where lastName like '%${name}%' or firstName like '%${name}%' `+
                                `or speciallityName like '%${name}%' limit ${offset},${limit}`;
     
                }else{
                    sqlLimit = `select * from ViewDoctor limit ${offset},${limit}`;
                }
               
            connectDb.query(sqlLimit,(err,doctors)=>{
                console.log(doctors);
                let sql = "select count(*) as total from ViewDoctor";
            connectDb.query(sql,(error, results, fields) =>{
            if (error) throw error;
          
             const total =results[0].total
             const fieldsDoctors = new APIFeatures(doctors,req.query);
             const doctorField =  fieldsDoctors.sort().fields()
             res.status(200).json({status:"success",doctors:doctorField.query,total});  
        })  
        })     
            }else{
                next();
            }
                   
        }else{
            next();
        }
    }