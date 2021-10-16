import { Injectable } from "@angular/core";
import { IdoctorPopular } from "./doctorPopular.model";
const LOCATION = "Đà Lạt, Việt Nam";
const PATH = "assets/img/doctors/";
@Injectable()

export class DoctorPopularService{
    constructor(){}

    getPopularDoctor():IdoctorPopular[]{
        return POPULAR_DOCTOR;
    }
}

const POPULAR_DOCTOR:IdoctorPopular[] = [
    {
        id:1,
        name:"Nguyễn Mậu Tuấn",
        src:`${PATH}doctor-01.jpg`,
        specialitiesName:"Urology",
        location:LOCATION,
        available: new Date(),
        money : 200.000 
    },
    {
        id:2,
        name:"Nguyễn Phát Triển",
        src:`${PATH}doctor-02.jpg`,
        specialitiesName:"Orthopedic",
        location:LOCATION,
        available: new Date(),
        money : 300.000 
    },
    {
        id:3,
        name:"Huỳnh Thiên Tân",
        src:`${PATH}doctor-03.jpg`,
        specialitiesName:"Urology",
        location:LOCATION,
        available: new Date(),
        money : 200.000 
    },
    {
        id:4,
        name:"Hà Quốc Huy",
        src:`${PATH}doctor-04.jpg`,
        specialitiesName:"Cardiologist",
        location:LOCATION,
        available: new Date(),
        money : 500.000 
    },
    {
        id:5,
        name:"Phạm Lê Anh Quốc",
        src:`${PATH}doctor-05.jpg`,
        specialitiesName:"Dentist",
        location:LOCATION,
        available: new Date(),
        money : 400.000 
    }
]