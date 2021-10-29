import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IDoctor } from 'src/app/interface/Idoctor/index';
import { DoctorPopularService } from '../../home';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router} from '@angular/router';


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
  constructor(private doctorService:DoctorPopularService, private route:ActivatedRoute,
              private router:Router) {


      }
  ngOnInit(): void {
  const doctors =  this.route.snapshot.data['Doctors'];
  this.rows =this.doctorService.ViewTableList(doctors);
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
