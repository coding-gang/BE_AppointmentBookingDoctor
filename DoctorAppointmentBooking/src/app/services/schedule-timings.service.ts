import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {from, Observable, Subscription} from "rxjs";
import {ScheduleTimingModels} from "../interface/IScheduleTimings/ScheduleTimings.model";
import {ScheduleTimingDoctorModel} from "../interface/IScheduleTimings/ScheduleTimingDoctor.model";
import {map} from "rxjs/operators";
import {ScheduleTimingModel} from "../interface/IScheduleTimings/ScheduleTiming.model";


@Injectable({
  providedIn: 'root'
})

export class ScheduleTimingsService {
   scheduleTimingDoctor!:ScheduleTimingDoctorModel;
  result:Subscription =new Subscription();
  constructor(private  http:HttpClient) {
  }

  getById(id:any):Observable<ScheduleTimingModels>{
    return this.http.get<ScheduleTimingModels>(`api/v1/schedule/${id}`)
  }

}
