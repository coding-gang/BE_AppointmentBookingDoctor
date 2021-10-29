import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IDoctor } from "src/app/interface/Idoctor";
import { DoctorPopularService } from "src/app/services/popular.service";

@Injectable()
export class DoctorListResolver implements Resolve<any>{
  doctors:any
  constructor(private doctorService : DoctorPopularService){}

    resolve(){
       this.doctors =this.doctorService.getAllDoctors();
      return this.doctors;

    }

}
