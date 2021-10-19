import { Component, OnInit,Input } from '@angular/core';
import { IdoctorPopular } from '../doctorPopular.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-doctor-widget',
  templateUrl: './doctor-widget.component.html',
  styleUrls: ['./doctor-widget.component.css']
})
export class DoctorWidgetComponent implements OnInit {
  @Input() doctor:any;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  // goToDoctorProfile(){
  //          this.router.navigate(['/doctor-profile/',this.doctor.id])
  // }

}
