import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode,DatatableComponent } from '@swimlane/ngx-datatable';
import { from, Observable, of } from 'rxjs';
import { catchError, filter, find, map, tap, toArray } from 'rxjs/operators';
import { IMessage } from 'src/app/interface/Imessage.model';
import { SpecialitiesService } from 'src/app/services/specialities.service';
import { AddSpecialityComponent } from './add-speciality/add-speciality.component';
import { UpdateSpecialitiesComponent } from './update-specialities/update-specialities.component';
import { ModalconfirmDoctorComponent } from '../doctor-dash/modalconfirm-doctor/modalconfirm-doctor.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.css']
})
export class SpecialitiesComponent implements OnInit {
  test:string=''
  namePage = "Specialities";
  nameComponent = "Specialities";
  rows:any[] =[];
  editing:any = {};
  ColumnMode =ColumnMode;
  tablestyles:any ="bootstrap";
  idSpeciality!:number
  @ViewChild('modalAdd')modalAdd!:AddSpecialityComponent
  @ViewChild('modalEdit')modalEdit!:UpdateSpecialitiesComponent
  @ViewChild('modalDelete')modalDelete!:ModalconfirmDoctorComponent
  @ViewChild('mydatatable')mydatatable!:DatatableComponent

  constructor(private specService:SpecialitiesService,
              private toash:ToastrService) { }

  ngOnInit(): void {
   this.initRowsTable();
  }
  initRowsTable(){
    this.specService.getSpecialties()
    .subscribe(specs =>{
     this.rows  = this.specService.viewSpecialties(specs.specialities)
       this.rows =[...this.rows]
     })

  }
  updateValue(event:any, cell:any, rowIndex:any) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }
  openModalAdd(){
    this.modalAdd.openModal();
  }
  eventFromModal(message:IMessage){
    if(message.status === "success"){
      this.modalAdd.closeModal();
         of(message.speciality).pipe(
           map((item:any) =>{
              return {...item,avatar:"assets/admin/img/specialities/specialities-01.png"}
           })
           ).subscribe(item=> this.rows =[...this.rows,item])
    }else{
      console.log(message.message);

    }
  }
  editModalSpeciality(id:any){
        this.modalEdit.getSpecialityById(id);
        this.modalEdit.openModal();
  }

  eventFromEdit(message:IMessage){
    if(message.status === "success"){
      this.modalEdit.closeModal();
      from(this.rows).pipe(
        find((item) => item.specialityId == message.speciality?.specialityId)
      ).subscribe((rs)=>{
        rs.speciallityName = message.speciality?.speciallityName
        this.rows =[...this.rows]
        this.toash.success(message.message,message.status)
      })
    }
  }

  deleteModalSpeciality(status:string){
      if(status === "save"){
           if(this.idSpeciality){
            this.specService.deleteSpecialityById(this.idSpeciality).pipe(
               ).subscribe((mess) =>{ mess.status === 'success' ?
              this.deleteRowsById(this.idSpeciality)
              .subscribe((r) => this.rows = [...r]) : console.log('Error')
            })
            this.modalDelete.closeModal();
      }
  }
}

  deleteRowsById(id:number){
   const filterRows = from(this.rows).pipe(
      filter(x => x.specialityId !== id),
     // tap(val =>console.log(val)),
      toArray()
    )
    return filterRows
  }

  setIdDeleteAndOpenDelModal(id:number){
    this.idSpeciality =id;
    this.modalDelete.openModal();
  }
}
