const connectDb = require('../utils/connectionDB');

exports.getById = (req, res) => {
    const specialityId=   req.params.specialityId;
    const sql = "select * from specialities where specialityId=(?)";
    connectDb.query(sql,specialityId,(error,result)=>{
        if(error) throw error;
        console.log(result);
        res.status(200).json({result:result});
    })
}
exports.getAll = (req,res) =>{
    let sql = "select * from specialities";
    console.log(sql);
    connectDb.query(sql,(error, results, fields) =>{
    if (error) throw error;
    const specialities =results;
    res.status(200).json({status:"success",specialities:specialities});
})

}

exports.update = (req,res) =>{
    const specialityId = req.params.specialityId;
    let sql = "call Update_Specialities_Proc(?,?)";
    const params = [specialityId];
    let speciality = {};
    speciality = req.body;
    Object.values(speciality).forEach(val => params.push(val));
    connectDb.query(sql,params,(error,results,fields)=>{
        if(error) throw error;
        console.log(results[0][0].result);
        res.status(204).send();
    })
}

exports.delete = (req,res) => {
    const specialityId = req.params.specialityId;
    const sql = "call Del_Specialities_Proc(?)";
    connectDb.query(sql,specialityId,(error,result)=>{
        if(error) throw error;
        console.log(result[0][0].result);
        res.status(204).send();
    })
}