import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode,DatatableComponent } from '@swimlane/ngx-datatable';
import { from, of } from 'rxjs';
import { find, map } from 'rxjs/operators';
import { IMessage } from 'src/app/interface/Imessage.model';
import { SpecialitiesService } from 'src/app/services/specialities.service';
import { AddSpecialityComponent } from './add-speciality/add-speciality.component';
import { UpdateSpecialitiesComponent } from './update-specialities/update-specialities.component';
@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.css']
})
export class SpecialitiesComponent implements OnInit {

  namePage = "Specialities";
  nameComponent = "Specialities";
  rows:any[] =[];
  editing:any = {};
  ColumnMode =ColumnMode;
  tablestyles:any ="bootstrap";
  @ViewChild('modalAdd')modalAdd!:AddSpecialityComponent
  @ViewChild('modalEdit')modalEdit!:UpdateSpecialitiesComponent
  @ViewChild('mydatatable')mydatatable!:DatatableComponent
  constructor(private specService:SpecialitiesService) { }

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
      })
    }
  }

}
