import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css']
})
export class CreateDoctorComponent implements OnInit {
  namePage:string = 'New doctor';
  nameComponent:string ="New doctor";
  constructor() {
   }
  ngOnInit(): void {
  }

}
