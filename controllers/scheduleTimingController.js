const connectDb = require('../utils/connectionDB');
const appError = require('../utils/appError');



exports.getAll =(req,res)=>{
    const sql ='select * from scheduleTimings';
    connectDb.query(sql,(err,scheduleTimings) =>{
        if(err) throw err;
      
         res.status(200).json({status:'success',message:'ok',scheduleTimings})
    })
}
exports.getbyId =(req,res)=>{
    const id = req.params.id;
    const sql ='call getScheduleTimingsInWeekByDoctorId(?)';
    connectDb.query(sql,id,(err,scheduleTimings) =>{
        if(err) throw err;
       const dataTimingsByDate = InitScheduleDate(scheduleTimings[0]);
         res.status(200).json({status:'success',message:'ok',scheduleTimings:dataTimingsByDate})
    })
}

exports.getScheduleInWeekByIdDoctor =(req,res)=>{
  const id = req.params.id;
  const sql ='call getScheduleTimingsInWeekByDoctorId(?)';
  connectDb.query(sql,id,(err,scheduleTimings) =>{
      if(err) throw err;
      console.log(scheduleTimings);
     const dataTimingsByDate = InitScheduleDate(scheduleTimings[0]);
       res.status(200).json({status:'success',message:'ok',scheduleTimings:dataTimingsByDate})
  })
}

function InitScheduleDate(scheduleTimings){
  const dataTimingsByDate = {
    Sun:[],
    Monday : [],
    Thuesday :[],
    Wenday :[],
    Thursday :[],
    Friday :[],
    Sat :[]
}
scheduleTimings.forEach(val =>{
 const dates = new Date(val.bookDate).getDay();
 switch(dates){
   case 0:
     let sun ={... val};
     dataTimingsByDate.sun.push(sun)
     break;
   case 1:
     let monday ={... val};
     dataTimingsByDate.Monday.push(monday)
     break;
   case 2:
     let thuesday ={... val};
   dataTimingsByDate.Thuesday.push(thuesday)
     break;
   case 3:
     let wenday = {... val};
     dataTimingsByDate.Wenday.push(wenday)
     break;
   case 4:
     let thu ={... val};
     dataTimingsByDate.Thursday.push(thu)
     break;
   case 5:
     let friday = {... val};
     dataTimingsByDate.Friday.push(friday)
     break;
   case 6:
     let sat ={... val};
     dataTimingsByDate.Sat.push(sat);
     break;
   case 7:
     dataTimingsByDate.empty= [];
     break;
 }
})
     return dataTimingsByDate;
}


exports.getScheduleById = (req,res)=>{
  const id = req.params.id;
  const sql ='select * from scheduleTimings where scheduleTimingId =(?)';
  connectDb.query(sql,id,(err,scheduleTiming) =>{
    res.status(200).json({status:'success',message:"ok", scheduleTiming});
  })
}

exports.Add =  (req,res)=>{
  const sql = "call Add_Scheduletiming_Proc(?,?,?,?)";
      ({dayAdd,startBegin,endTime} ={...req.body});
const params = [dayAdd,startBegin,endTime,req.params.id];
connectDb.query(sql,params,(err,rs) =>{
   if(err) throw err;
   console.log(rs);
  const scheduleTiming= rs[0][0]
   res.status(200).json({status:'success',message:"Th??m l???ch kh??m b???nh th??nh c??ng", scheduleTiming});
})
}

exports.update =(req,res) => {
  ({dayAdd,startBegin,endTime} ={...req.body});
  console.log(dayAdd);
  console.log(startBegin);
  console.log(endTime);
  const sql = "call Update_Scheduletimings_Proc(?,?,?,?)"
  connectDb.query(sql,[req.params.id,dayAdd,startBegin,endTime],(err,rs) =>{
         if(err) throw err;
     const scheduleTiming= rs[0][0]
      res.status(200).json({status:'success',message:"C???p nh???t l???ch kh??m b???nh th??nh c??ng", scheduleTiming})
  })
}

exports.delete = (req,res) =>{
  const sql = "call Del_Scheduletimings_Proc(?)"
  connectDb.query(sql,[req.params.id],(err,rs)=>{

    console.log(rs)
  const message = rs[0][0];
  if(rs[0][0].fail){

    res.status(409).json({status:'fail', message:rs[0][0].fail});

  }else{
    res.status(200).json({status:'success', message: message.result});
  }
     
  })
}

exports.checkTiming = (req,res,next) =>{
  ({dayAdd,startBegin,endTime} ={...req.body}) 
  const sql = "select checkTiming(?,?,?) as result"
  connectDb.query(sql,[dayAdd,startBegin,endTime],(err,rs)=>{
      if(err) throw err;
      [{result}] = [...rs];
      console.log(result);
     switch(result){
             case 1 : {
                  next();
                  break;
              }
              case 2:{
                  const err =  new appError(409,`Gi??? b???t ?????u ph???i l???n h??n gi??? k???t th??c!`);
                   res.status(err.statusCode).json(err.resError().error);
                   break;
              }
             default:{
                  const err =  new appError(409,"L???i ?????t l???ch!");
                   res.status(err.statusCode).json(err.resError().error);
                   break;
              }
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
         switch(result){
             case 1 : {next(); break;}
             case 2:{
                  const err =  new appError(409,"th???i gian b???t ?????u ch??a ph?? h???p!");
                   res.status(err.statusCode).json(err.resError().error);
                   break;
              }
              case 3:{
                  const err =  new appError(409,"th???i gian k???t th??c ch??a ph?? h???p!");
                   res.status(err.statusCode).json(err.resError().error);
                   break;
              }
             default:{
                  const err =  new appError(409,"Kho???ng th???i gian n??y kh??ng ph?? h???p!");
                   res.status(err.statusCode).json(err.resError().error);
                   break;
              }
          }
  })
}

