import { Component, ElementRef, OnInit, ViewChild,EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IMessage } from 'src/app/interface/Imessage.model';
import { SpecialitiesService } from 'src/app/services/specialities.service';
import { HandlerError } from '../../shared/handlerError.service';
@Component({
  selector: 'app-add-speciality',
  templateUrl: './add-speciality.component.html',
  styleUrls: ['./add-speciality.component.css']
})

export class AddSpecialityComponent implements OnInit {
  isOpenModal:boolean=false
  mouseover:any
 @Output() successAdd = new EventEmitter<IMessage>()
  @ViewChild('modalchild')modalchild!:ElementRef
  speciallityName:string=''
  constructor(private specialityService:SpecialitiesService,
     private handleError:HandlerError) { }

  ngOnInit(): void {
  }

  openModal(){
    this.isOpenModal =true;
   }
   closeModal(){
   this.isOpenModal =false;
   }
   ngAfterViewInit(){
    fromEvent(this.modalchild.nativeElement,'click').pipe(
       map( (el:any) => el.target.className)
    )
    .subscribe(el => el === 'modal fade show' ? this.isOpenModal = false : this.isOpenModal)

  }
  addSpecialities(frm:FormGroup){
  this.specialityService.addSpeciality(frm).pipe(catchError(this.handleError.Handler()))
  .subscribe((mes:IMessage) =>this.successAdd.emit(mes))
   }
}
