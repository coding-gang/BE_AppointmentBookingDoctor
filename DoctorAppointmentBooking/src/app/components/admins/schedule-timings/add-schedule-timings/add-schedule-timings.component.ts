import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent} from "rxjs";
import {map} from "rxjs/operators";
import {IMessage} from "../../../../interface/Imessage.model";

@Component({
  selector: 'app-add-schedule-timings',
  templateUrl: './add-schedule-timings.component.html',
  styleUrls: ['./add-schedule-timings.component.css']
})
export class AddScheduleTimingsComponent implements OnInit ,AfterViewInit{
  isOpenModal:boolean=false
  constructor() { }
  BeginTimings:string=""
  EndTimings:string=""
  @ViewChild('modalchild')modalchild!:ElementRef
  @Output() successAdd = new EventEmitter<IMessage>()
  ngOnInit(): void {
  }

  openModal(){
    this.isOpenModal =true;
  }

  ngAfterViewInit(){
    fromEvent(this.modalchild.nativeElement,'click').pipe(
      map( (el:any) => el.target.className)
    )
      .subscribe(el => el === 'modal fade custom-modal show' ? this.isOpenModal = false : this.isOpenModal)
  }

  closeModal(){
    this.isOpenModal =false;
  }

  addSchedule(frmAdd:any){
    console.log(frmAdd)
  }

}
