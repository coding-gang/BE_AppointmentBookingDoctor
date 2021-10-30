const { add } = require('nodemon/lib/rules');
const connectDb = require('../utils/connectionDB');

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

exports.Add = (req,res)=>{
       const sql = "call Add_Doctor_Proc(?,?,?,?,?,?,?,?,?)";
       const doctor =  req.body;
       doctor.DOB = doctor.DOB.split("/").reverse().join("-");
       console.log(doctor);
       doctor.gender = doctor.gender ===1 ? true : false;
       const params = [];
       Object.values(doctor).forEach(el => params.push(el));
       connectDb.query(sql,params,(error,results,fields)=>{
        if (error) throw error;
       const message =results[0][0].result;
        res.status(201).json({status:'success',message:message});
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
