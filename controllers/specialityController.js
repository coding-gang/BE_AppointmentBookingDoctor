const connectDb = require('../utils/connectionDB');
const appError = require('../utils/appError');
const APIFeatures =require('../utils/apiFeatures');
exports.getById = (req, res) => {
    const specialityId=   req.params.specialityId;
    const sql = "select * from specialities where specialityId=(?)";
    connectDb.query(sql,specialityId,(error,result)=>{
        if(error) throw error;
        res.status(200).json({specialities:result});
    })
}

exports.getAll = (req,res) =>{
    let sql = "select * from specialities";
    connectDb.query(sql,(error, results, fields) =>{
    if (error) throw error;
    const specialities =results;
    res.status(200).json({status:"success",specialities:specialities});
})}

exports.getAllWithField = (req,res,next)=>{
    if(Object.keys(req.query).length !== 0){
        const sql = "select * from specialities";
        connectDb.query(sql,(error, results, fields) =>{
            if (error) throw error;
              const specialities =results;
              const fieldsSpecialities = new APIFeatures(specialities,req.query);
             const SpecField =  fieldsSpecialities.sort().fields().limitFields();
              res.status(200).json({status:"success",specialities:SpecField});
        })
    }else{
        next();
    }
}


exports.update = (req,res) =>{
    const specialityId = req.params.specialityId;
    let sql = "call Update_Specialities_Proc(?,?)";
    const params = [specialityId];
    let speciality = {};
    speciality = req.body;
    
    Object.values(speciality).forEach(val => {params.push(val)});
    connectDb.query(sql,params,(error,results,fields)=>{
        if(error) throw error;
        const message =results[0][0].message;
        const result =results[1][0];
        console.log(result)
       res.status(200).json(
           {
               status:'success',
               message:message,
               speciality:{
                specialityId: result.specialityId,
                speciallityName: result.speciallityName
               }
           }
           );
    })
}
exports.delete = (req,res) => {
    const specialityId = req.params.specialityId;
    const sql = "call Del_Specialities_Proc(?)";
    connectDb.query(sql,specialityId,(error,result)=>{
        if(error) throw error;
        const message = result[0][0].message;
        res.status(200).json({status:'success',message:message});
    })
}

exports.insert = (req,res) =>{
    const sql = "call Add_Specialities_Proc(?)";
    const data=req.body.speciallityName;
    connectDb.query(sql,data,(error,results)=>{
        if(error) throw error;
        const message =results[0][0].message;
        const result =results[1][0];
       res.status(201).json(
           {
               status:'success',
               message:message,
               speciality:{
                specialityId: result.specialityId,
                speciallityName: result.speciallityName
               }
           }
           );
    })
}

exports.isExistSpecialities = (req,res,next)=>{
    const specialityId = req.params.specialityId;
    const isExistSpecSql = `select isExist_Specialities_func(?) as isExistSpec`;
    const isExistSpecFromDoctorSql = `select isExist_SpecialitiesFromDoctor_func(?) as isSpecFromDoctor`;
    const sql = `${isExistSpecSql};${isExistSpecFromDoctorSql};`;
    connectDb.query(sql,[specialityId,specialityId],(error,result)=>{
        if(error) throw error;
         const isExistSpec =  result[0][0].isExistSpec;
         const isNotExistDoctor = result[1][0].isSpecFromDoctor;
         if(isNotExistDoctor === 0 && isExistSpec !==0){
                next();      
         }else{
             const err =  new appError(409,"Xo?? d??? li???u th???t b???i");
             res.status(err.statusCode).send(err.resError().error);
         }
    })
}

exports.isExistNameSpec = (req,res,next) =>{
    const speciallityName=req.body.speciallityName;
    const sql = "select isExist_NameSpec_Func(?) as isExistName";
    connectDb.query(sql,speciallityName,(error,result)=>{
        if(error) throw error;
        if(result[0].isExistName ===0) {
            next();
        }
        else{
            const err = new appError(409,"???? t???n t???i chuy??n ng??nh trong c?? s??? d??? li???u");
            res.status(err.statusCode).send(err.resError().error);
        }
    })

}
