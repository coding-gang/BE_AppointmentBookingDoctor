import {Component, OnInit, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
   @Input() name:string ='';
  constructor() {}

  ngOnInit(): void {
    this.name ="All doctor profile"
  }

}
