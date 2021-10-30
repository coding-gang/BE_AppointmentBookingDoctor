const { query } = require('express');
const connectDb = require('../utils/connectionDB');
const appError = require('../utils/appError');
exports.getAll = (req,res) =>{
    const sql = "select * from adminsView";
    connectDb.query(sql,(error,result)=>{
        if(error) throw error;
        console.log(str.length);
        console.log(result[0].adminId);
        const adminView =[];
       Object.values(result).forEach(val => {
           // Destructuring 
        ({password,...rest} = val);
            adminView.push(rest);
       })
        res.status(200).json({status:"success",data:adminView});
    })
};

exports.getById = (req, res) => {
    const adminId = req.params.adminId;
    console.log(adminId);
    const sql = "select * from adminsView where adminId =(?)";
    connectDb.query(sql,adminId,(error, result) =>{
        if(error) throw error;
        console.log(result);
        res.status(200).json({status:"success",data:result})
    })
}

exports.update = (req,res) => {
    const sql = "call Update_Amind_Proc(?,?,?,?)";
      const adminId = req.params.adminId;
      const params = [adminId];
      const admins = req.body;
      Object.values(admins).forEach(val => params.push(val));
      connectDb.query(sql,params,(error,result)=>{
          if(error) throw error;
          console.log(result);
          res.status(200).send({massage:"Cập nhật dữ liệu thành công"});
      })
}

exports.insert = (req,res) =>{
   ({userName, password, roleId}=req.body);
   const params =[userName, password, roleId];
   const sql = "call Add_Admin_Proc(?,?,?)";
   connectDb.query(sql,params,(error)=>{
       if(error) throw error;
       res.status(200).send({massage:"Thêm dữ liệu thành công"});
   })
}
exports.deleteAdmin = (req,res) =>{
    const param = req.params.adminId;
    console.log(param);
    const sql = "call Del_Admins_Proc(?)";
    connectDb.query(sql,param,(error)=>{
        if(error) throw error;
        res.status(200).send({massage:"Xoá dữ liệu thành công thành công"});
    })
}
exports.checkUpdateAdminValid= (req,res,next) => {
    const userName = req.body.userName;
    const idRole = req.body.roleId;
    const isExistRoleFromAdminSql = "select isExist_RoleFromAdmin_Func(?) as isExistRole";
    const isExistUsernameSql = "select isExist_UsernameFromAdmin_Func(?) as isExistUserName"
    const sql = `${isExistRoleFromAdminSql}; ${isExistUsernameSql};`
    connectDb.query(sql,[idRole,userName],(error,result)=>{
        if(error ) throw error;
        // Destructuring & rest
        const [{isExistRole,...role},{isExistUserName,...admin}] = [...result[0],...result[1]];
        if(isExistRole !==0 &&  isExistUserName ===0) next();
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