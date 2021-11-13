const connectDb = require('../utils/connectionDB');
const appError = require('../utils/appError');
exports.Add =  (req,res)=>{
       const sql = "call Add_Scheduletiming_Proc(?,?,?,?)";
           ({dayAdd,startBegin,endTime,doctorId} ={...req.body});
     const params = [dayAdd,startBegin,endTime,doctorId];
    connectDb.query(sql,params,(err,rs) =>{
        if(err) throw err;
        console.log(rs);
       const doctor= rs[0][0]
        res.status(200).json({status:'success',message:"Thêm lịch khám bệnh thành công", doctor})
    })

}
exports.checkTiming = (req,res,next) =>{
    console.log(req.body);
    ({startBegin,endTime} ={...req.body}) 
    console.log(endTime);
    const sql = "select checkTiming(?,?) as result"
    connectDb.query(sql,[startBegin,endTime],(err,rs)=>{

         [{result}] = [...rs];
        if(result ===1) next();
        else{
            const err =  new appError(409,"thời gian kết thúc chưa phù hợp!");
            res.status(err.statusCode).json(err.resError().error);
        }
    })
}

exports.checkExistTiming = (req,res,next) =>{

    const sql = "select checkExistTiming(?,?,?,?) as result";

    ({dayAdd,startBegin,endTime,doctorId} ={...req.body});
    const params = [dayAdd,startBegin,endTime,doctorId];
    connectDb.query(sql,params,(err,rs)=>{
         [{result}] = [...rs]
        console.log(rs);
        if(err) throw err;
            if(result === 1 ) next();
        else{
           switch(result){
               case 2:{
                    const err =  new appError(409,"thời gian bắt đầu chưa phù hợp!");
                     res.status(err.statusCode).json(err.resError().error);
                }
                case 3:{
                    const err =  new appError(409,"thời gian kết thúc chưa phù hợp!");
                     res.status(err.statusCode).json(err.resError().error);
                }
               default:{
                    const err =  new appError(409,"Khoảng thời gian này không phù hợp!");
                     res.status(err.statusCode).json(err.resError().error);
                }
            }
        }
    })
}