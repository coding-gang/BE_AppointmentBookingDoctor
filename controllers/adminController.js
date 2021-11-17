const connectDb = require('../utils/connectionDB');
const appError = require('../utils/appError');
const encryptPass = require('../utils/encrypt');
const decryptPass = require('../utils/decrypt');
const jwt = require('jsonwebtoken');
exports.getAll = (req,res) =>{
    const sql = "select * from adminsView";
    connectDb.query(sql,(error,result)=>{
        if(error) throw error;
        console.log(result[0].adminId);
        const adminView =[];
       Object.values(result).forEach(val => {
           // Destructuring 
        ({password,...rest} = val);
            adminView.push(rest);
       })
        res.status(200).json({status:"success",admins:adminView});
    })
};

exports.getById = (req, res) => {
    const adminId = req.params.adminId;
    const sql = "select * from adminsView where adminId =(?)";
    connectDb.query(sql,adminId,(error, result) =>{
        if(error) throw error;
        res.status(200).json({status:"success",admins:result})
    })
}

exports.update = (req,res) => {
    const sql = "call Update_Amind_Proc(?,?)";
      const adminId = req.params.adminId;
      const params = [adminId];
      const admins = req.body;
      Object.values(admins).forEach(val => params.push(val));
      connectDb.query(sql,params,(error,result)=>{
          if(error) throw error;
          console.log(result);
          const message = result[0][0].message;
          res.status(200).json({status:'success',message});
      })
}


exports.insert = async (req,res) =>{
    ({userName, pass, roleId}=req.body);
     const encrypt = new encryptPass(pass)
     const passEnrypt = await encrypt.encryptFunc();
     pass = passEnrypt;
     console.log(pass);
    const params =[userName, pass, roleId];
    const sql = "call Add_Admin_Proc(?,?,?)";
    connectDb.query(sql,params,(error,rs)=>{
        if(error) throw error;
      
        res.status(200).json({status:"success",message:`Thêm ${userName} thành công!`});
    })
 }
 

exports.deleteAdmin = (req,res) =>{
    const param = req.params.adminId;
    console.log(param);
    const sql = "call Del_Admins_Proc(?)";
    connectDb.query(sql,param,(error)=>{
        if(error) throw error;
        res.status(204).send();
    })
}

exports.checkUpdateAdminValid= (req,res,next) => {
    const userName = req.body.userName;
    const isExistUsernameSql = "select isExist_UsernameFromAdmin_Func(?) as isExistUserName"
    const sql = `${isExistUsernameSql}`
    connectDb.query(sql,userName,(error,result)=>{
        if(error ) throw error;
        // Destructuring & rest
        if(result[0].isExistUserName ===0) next();
        else{
            const err =  new appError(409,"Kiểm tra lại dữ liệu!");
            res.status(err.statusCode).json(err.resError().error);
        }
    })
}

exports.checkExistAdmin = (req, res, next)  =>{
    const param = req.params.adminId;
    const sql = "select isExist_Admin_Func(?) as isExistAdmin";
    connectDb.query(sql,param,(error,result)=>{
        if(error) throw error;
        [{isExistAdmin}] = [...result]
        if(isExistAdmin===1) next();
        else{
             const err =  new appError(409,"Không tồn tại người dùng này!");
            res.status(err.statusCode).json(err.resError().error);
        }
    })
}

exports.updatePass = async (req,res) => {
    const id = req.params.adminId;
    const newpass = req.body.newPass;
    
    const encrypt = new encryptPass(newpass);
    const newPassEncrypth= await encrypt.encryptFunc();
    const sql = "call Update_Password_Admin_Proc(?,?)";
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
    res.status(appErr.statusCode).json(appErr.resError().error);
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
        res.status(appErr.statusCode).json(appErr.resError().error);
    }  
    }
    
}

const decryptFromDB = (id) =>{
    return new Promise((resolve,reject)=>{
     const sql = "select getPassWord_Admin_Func(?) as result";
connectDb.query(sql,id,(err,rs)=>{
 if(err) throw err; 
        resolve(rs[0].result);
     })
})
}

exports.login= async(req,res)=>{

             const userN = req.body.nameOrEmail;
             const passClient = req.body.password;
             const sql ="call getDetailAdminByUsername_proc(?)";
         connectDb.query(sql,userN,async(err,result)=>{
             if(err) throw err;
            if(result[0].length > 0){
                [{adminId, userName, nameRole,password}] =[...result[0]];
             const decrypt = new decryptPass(passClient,password);
             const isAdmin =  await decrypt.decryptFunc();
             const admin = {
                 adminId, userName, nameRole
                 }
                if(isAdmin){
                  const privateKey = process.env.KEY_SECRET;
                  const audience = process.env.AUDIENCE;
                  const issuer = process.env.ISSUER;
                  const token = await jwt.sign(admin,privateKey,{audience,issuer, expiresIn:"120s" });
                       res.status(200)
                           .json({status:"success",message:"Chào mừng bạn quay lại!",token})
                }else{
                  const appErr = new appError(404,`Password không đúng`);
                  res.status(appErr.statusCode).json(appErr.resError().error);
                }
            }else{
              const appErr = new appError(404,`Username không tồn tại: ${userN}`);
              res.status(appErr.statusCode).json(appErr.resError().error);
            }
          })
     }
