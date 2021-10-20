const connectDb = require('../utils/connectionDB');

exports.getAll = (req,res,next) =>{
    let sql = "Call View_doctors_proc";
    connectDb.query(sql,(error, results, fields) =>{
    if (error) throw error;
    const doctors =results[0];
    res.status(200).json({status:'success',doctors:doctors});
})
}