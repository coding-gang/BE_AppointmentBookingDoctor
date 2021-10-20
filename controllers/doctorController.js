const connectDb = require('../utils/connectionDB');

exports.getAll = (req,res,next) =>{
    let sql = "Call View_doctors_proc";
    connectDb.query(sql,(error, results, fields) =>{
    if (error) throw error;
    const doctors =results[0];
    res.status(200).json({status:'success',doctors:doctors});
})
}

exports.getById = (req,res)=>{
    const id =req.params.doctorId;
     let sql="call Get_doctorById_proc(?)";
     connectDb.query(sql,id,(error, results, fields) =>{
        if (error) throw error;
        const doctor =results[0];
        res.status(200).json({status:'success',doctor});
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
        res.status(204).send();
    })
}

exports.delete = (req,res)=>{
    const id =req.params.doctorId;
     let sql =  "call Del_Doctor_Proc(?)";
     connectDb.query(sql,id,(error, results, fields) =>{
        if (error) throw error;
        const message =results[0][0].result;
        console.log(message);
        res.status(204).send();
    })
}