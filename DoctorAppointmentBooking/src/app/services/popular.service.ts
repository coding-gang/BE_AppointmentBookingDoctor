import { Injectable } from "@angular/core";
import { IdoctorPopular } from "../components/home/popular/doctorPopular.model";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { from, Observable, of, Subject } from "rxjs";
import {map} from 'rxjs/operators'
import { ICreateDoctor,IDoctor ,IDoctorProfile } from "../interface/Idoctor/index";
import { IMessage } from "../interface/Imessage.model";
import * as moment from "moment";

const LOCATION = "Đà Lạt, Việt Nam";
const PATH = "assets/img/doctors/";

const POPULAR_DOCTOR:IdoctorPopular[] = [];

@Injectable()
export class DoctorPopularService{
    constructor(private http:HttpClient){}

    viewPopularDoctor(data:IDoctor):IdoctorPopular[]{
        if(data.doctors.length>0){
            const doctors =data.doctors;
              let i =1;
              doctors.slice(0,5).forEach(el => {

                  const doctor:IdoctorPopular = {
                   id : el.doctorId,
                   name: `${el.lastName} ${el.firstName}`,
                   src:`${PATH}doctor-0${i}.jpg`,
                   specialitiesName: el.speciallityName,
                   location:LOCATION,
                   available: new Date(),
                   money : 200.000
                  }
                  i == 5 ? i=1 : i++
                     POPULAR_DOCTOR.push(doctor);
              })
        }
        return POPULAR_DOCTOR;
    }

    getAllDoctors():Observable<IDoctor>{
          return this.http.get<IDoctor>(`/api/v1/doctors`,{ responseType:'json'});
    }

    ViewTableList(doctors:IDoctor){
      let i =0;
       let docs:any[]=[];
        from(doctors.doctors)
           .pipe(
             map(item => {

              i == 5 ? i=1 : i++
               return{
                 id:item.doctorId,
                 fullName: `${item.lastName} ${item.firstName}`,
                 speciality: item.speciallityName,
                 avatar:`${PATH}doctor-0${i}.jpg`,
               }
             })
             ).subscribe(d=>  docs.push(d));
         return docs;

    }

    AddDoctor(doctor:ICreateDoctor):Observable<IMessage>{

      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": '*'
        });
          return this.http.post<IMessage>('http://localhost:3000/api/v1/doctor',
                             doctor)
    }

    getDoctorById(id:any):Observable<IDoctor>{
        return this.http.get<IDoctor>(`http://localhost:3000/api/v1/doctor/${id}`);
    }

    updateDoctorById(id:any,doctor:any):Observable<IMessage>{
      return this.http.put<IMessage>(`http://localhost:3000/api/v1/doctor/${id}`,doctor);
  }

    viewDoctorProfile(doctor:IDoctor):Observable<IDoctorProfile>{
                     let i =0;
                    return  of(doctor.doctors[0]).pipe(
                        map(item =>{
                          i == 5 ? i=1 : i++
                          const doctorProfile:IDoctorProfile={
                            firstName : item.firstName,
                            lastName :item.lastName,
                            doctorId:item.doctorId,
                            fullName: `${item.lastName} ${item.firstName}`,
                            DOB: moment(item.DOB).format('DD/MM/YYYY') ,
                            address:item.address,
                            avatar:`${PATH}doctor-0${i}.jpg`,
                            phone: item.phone
                          }
                          return doctorProfile
                        })
                      )
    }

    removeDoctor(id:any):Observable<IMessage>{
        return this.http.delete<IMessage>(`http://localhost:3000/api/v1/doctor/${id}`);
    }

    updatePass(id:any,passwordUpdate:any):Observable<IMessage>{
      return this,this.http.put<IMessage>(`api/v1/doctor/update-password/${id}`,passwordUpdate);
    }
}


