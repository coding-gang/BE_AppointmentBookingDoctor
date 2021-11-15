import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ScheduleTimingsService} from "../../../services/schedule-timings.service";
import {AuthService} from "../../../services/auth.service";
import {ScheduleTimingModels} from "../../../interface/IScheduleTimings/ScheduleTimings.model";
import {ScheduleByDateModel} from "../../../interface/IScheduleTimings/ScheduleByDate.model";
import {Observable, Subscription} from "rxjs";
import {ScheduleTimingModel} from "../../../interface/IScheduleTimings/ScheduleTiming.model";

@Component({
  selector: 'app-schedule-timings',
  templateUrl: './schedule-timings.component.html',
  styleUrls: ['./schedule-timings.component.css']
})
export class ScheduleTimingsComponent implements OnInit {
  nameComponent:string='ScheduleTimings'
  namePage:string='ScheduleTimings'
  active:boolean=false
  slotName:string =''
  timings:ScheduleTimingModel[] =[]
  subResult!:ScheduleTimingModels

  constructor(private  cdr:ChangeDetectorRef,
              private scheduleService:ScheduleTimingsService,
              private authen:AuthService) { }

  ngOnInit(): void {
    this.getById();
  }

  getById(){
    const id = this.authen.getId();
   this.scheduleService.getById(id)
     .subscribe(val =>{this.subResult = val})
  }

  activeSlot($event:any){
    console.log(this.subResult)
   this.slotName =  $event.id
    console.log(this.slotName)
    switch (this.slotName){
      case 'slot_sunday':
        this.timings = this.subResult.scheduleTimings.Sun
        console.log(this.timings)
        break;
      case 'slot_monday':
        this.timings = this.subResult.scheduleTimings.Monday
        break;
      case 'slot_tuesday':
        this.timings = this.subResult.scheduleTimings.Thuesday
        break;
      case 'slot_wednesday':
        this.timings = this.subResult.scheduleTimings.Wenday
        break;
      case 'slot_thursday':
        this.timings = this.subResult.scheduleTimings.Thursday
        break;
      case 'slot_friday':
        this.timings = this.subResult.scheduleTimings.Friday
        break;
      case 'slot_saturday':
        this.timings = this.subResult.scheduleTimings.Sat
        break;
    }
    this.active =true;
   // this.cdr.detectChanges();
  }

}
