import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {ISpeciality, ISepecialites } from "../interface/ISpecialities/index";

import { from, Observable, of } from "rxjs";
import { map } from "rxjs/operators";

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
          ).subscribe(s => { console.log(s) ;specialities.push(s)})
          return specialities
  }
}
