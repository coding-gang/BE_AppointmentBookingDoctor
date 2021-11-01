import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {ISpeciality, ISepecialites } from "../interface/ISpecialities/index";

import { from, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { IMessage } from "../interface/Imessage.model";


const PATH = "assets/admin/img/specialities/specialities-";
const specialities:ISpeciality[]  =[];
@Injectable()
export class SpecialitiesService{
  constructor(private http:HttpClient){}
  getSpecialties():Observable<ISepecialites>{
    return this.http.get<ISepecialites>('/api/v1/specialities');
  }

  viewSpecialties(specs:ISpeciality[]){
    let i =0;
          from(specs).pipe(
            map(spec =>{
              i == 5 ? i=1 : i++
              return {
                ...spec,
                avatar:`${PATH}0${i}.png`
             }
            })
          ).subscribe(s => {specialities.push(s)})
          return specialities
  }
  addSpeciality(data:any):Observable<IMessage>{
        return this.http.post<IMessage>('/api/v1/specialities',data);
  }

  getSpecialityById(id:number):Observable<ISepecialites>{
    return this.http.get<ISepecialites>(`/api/v1/speciality/${id}`,);
  }

  updateSpecialityById(id:number,data:any):Observable<IMessage>{
    return this.http.put<IMessage>(`/api/v1/speciality/${id}`,data);
  }

  deleteSpecialityById(id:number):Observable<IMessage>{
    return this.http.delete<IMessage>(`/api/v1/speciality/${id}`)
  }
}
