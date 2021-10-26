import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IDoctor } from 'src/app/interface/doctor.model';
import { DoctorPopularService } from '../../home';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router} from '@angular/router';


@Component({
  selector: 'app-doctor-dash',
  templateUrl: './doctor-dash.component.html',
  styleUrls: ['./doctor-dash.component.css']
})

export class DoctorDashComponent implements OnInit {
  event$:any;
  namePage:string = 'List doctor';
  nameComponent:string ="List doctor";
  rows:any[] =[];
  editing:any = {};
  ColumnMode =ColumnMode;
  tablestyles:any ="bootstrap"
  constructor(private doctorService:DoctorPopularService,
              private router:Router) {
    this.doctorService.getAllDoctors()
    .subscribe(doc =>
      {
       this.rows = this.doctorService.ViewTableList(doc)
       })

      }
  ngOnInit(): void {
  }
  updateValue(event:any, cell:any, rowIndex:any) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }
  newDoctor(){
    this.router.navigateByUrl('/dashboard/doctor/new');
  }
}
