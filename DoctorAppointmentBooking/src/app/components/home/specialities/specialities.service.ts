import {Injectable} from '@angular/core';
import {ISpecialities} from './specialities.model';

const PATH = "assets/img/specialities/";

@Injectable()
export class SpecialitiesService{
    
  constructor(){}

  getSpecialties():ISpecialities[]{
      return SPECIALITIES;
  }

}

const  SPECIALITIES:ISpecialities[] =  [
    {
       id:"1",specialitity:"Urology",src:`${PATH}specialities-01.png`
    },
    {
      id:"2",specialitity:"Orthopedic",src:`${PATH}specialities-03.png`
    },
    {
      id:"3",specialitity:"Cardiologist",src:`${PATH}specialities-04.png`
    },
    {
      id:"4",specialitity:"Dentist",src:`${PATH}specialities-05.png`
    },
    {
      id:"5",specialitity:"Urology",src:`${PATH}specialities-01.png`
    },
    {
      id:"6",specialitity:"Urology",src:`${PATH}specialities-01.png`
   },
   {
     id:"7",specialitity:"Orthopedic",src:`${PATH}specialities-03.png`
   },
   {
     id:"8",specialitity:"Cardiologist",src:`${PATH}specialities-04.png`
   },
   {
     id:"9",specialitity:"Dentist",src:`${PATH}specialities-05.png`
   },
   {
     id:"10",specialitity:"Urology",src:`${PATH}specialities-01.png`
   }
  ];