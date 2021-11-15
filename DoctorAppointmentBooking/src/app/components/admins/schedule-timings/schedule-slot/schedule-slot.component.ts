import {
  ElementRef,
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import {ScheduleTimingModel} from "../../../../interface/IScheduleTimings/ScheduleTiming.model";
import {IMessage} from "../../../../interface/Imessage.model";
import {AddSpecialityComponent} from "../../specialities/add-speciality/add-speciality.component";
import {AddScheduleTimingsComponent} from "../add-schedule-timings/add-schedule-timings.component";

@Component({
  selector: 'app-schedule-slot',
  templateUrl: './schedule-slot.component.html',
  styleUrls: ['./schedule-slot.component.css']
})
export class ScheduleSlotComponent implements OnInit,AfterViewInit ,OnChanges,OnDestroy{
  @Input() active:boolean =false
  @Input() timings:ScheduleTimingModel[]=[]
  @Input() id:any
  @ViewChild('slotRef')slotRef!:ElementRef
  @ViewChild('modalAdd')modalAdd!:AddScheduleTimingsComponent
  idSlot:any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.timings)
  }
  ngAfterViewInit() {
    this.idSlot =  this.slotRef.nativeElement.id
  }
  checkActive() {
    return  this.active
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.timings)
  }
  ngOnDestroy() {
    this.active =false;
  }

  eventFromModal($event:IMessage){
    console.log($event)
  }
  openModal(){
     this.modalAdd.openModal();
  }
}
