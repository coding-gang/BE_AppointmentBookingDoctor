import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMessage } from 'src/app/interface/Imessage.model';
import { SpecialitiesService } from 'src/app/services/specialities.service';

@Component({
  selector: 'app-update-specialities',
  templateUrl: './update-specialities.component.html',
  styleUrls: ['./update-specialities.component.css'],

})
export class UpdateSpecialitiesComponent implements OnInit {
  @Input() test:string=''
  isOpenModal:boolean=false
  mouseover:any
  id!:number
 @Output() successEdit = new EventEmitter<IMessage>()
  @ViewChild('modalchild')modalchild!:ElementRef
  speciallityName:string=''
  constructor(private specialityService:SpecialitiesService) { }

  ngOnInit(): void {
    console.log("hi");

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

  getSpecialityById(id:any){

    this.specialityService.getSpecialityById(id).subscribe(item=>{

       if(item.specialities.length >0){
         this.id =id
           this.speciallityName = item.specialities[0].speciallityName
       }else{
         console.log("no result")
       }
    });
  }

  updateSpecialities(frm:FormGroup){
  this.specialityService.updateSpecialityById(this.id,frm)
    .subscribe((mes:IMessage) =>this.successEdit.emit(mes) )
   }
}
