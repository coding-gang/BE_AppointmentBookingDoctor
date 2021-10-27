const { query } = require('express');
const connectDb = require('../utils/connectionDB');

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
        res.status(200).json({status:"success",data:adminView});
    })
};

exports.getById = (req, res) => {
    const adminId = req.params.adminId;
    console.log(adminId);
    const sql = "select * from adminsView where adminId =(?)";
    connectDb.query(sql,adminId,(error, result) =>{
        if(error) throw error;
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
          res.status(204).send();
      })
}

