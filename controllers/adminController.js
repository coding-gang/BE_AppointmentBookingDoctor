const { query } = require('express');
const connectDb = require('../utils/connectionDB');
const appError = require('../utils/appError');
const encryptPassword = require('../utils/encrypt');
const decryptPassword = require('../utils/decrypt');
const { password } = require('../config');
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
      console.log(admins);
    //   connectDb.query(sql,params,(error,result)=>{
    //       if(error) throw error;
    //       console.log(result);
    //       const message = result[0][0].message;
    //       res.status(200).send({status:'success',message});
    //   })
}

exports.insert = async  (req,res) =>{
   ( {userName,pass, roleId}= req.body);
   const encrypt = new encryptPassword(pass);
   const passEncrypted= await encrypt.encryptFunc();
   console.log(passEncrypted);
//    const params =[userName, '', roleId];
//    const sql = "call Add_Admin_Proc(?,?,?)";
//    connectDb.query(sql,params,(error)=>{
//        if(error) throw error;
//        res.status(200).send({status:'success',message:`Thêm ${userName} thành công!`});
//    })

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
    console.log(userName);
    const isExistUsernameSql = "select isExist_UsernameFromAdmin_Func(?) as isExistUserName"
    const sql = `${isExistUsernameSql};`
    connectDb.query(sql,userName,(error,result)=>{
        if(error ) throw error;
        // Destructuring & rest
        if(result[0].isExistUserName ===0) next();
        else{
            const err =  new appError(409,"Kiểm ta lại dữ liệu!");
            res.status(err.statusCode).send(err.resError().error);
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
            res.status(err.statusCode).send(err.resError().error);
        }
    })
}