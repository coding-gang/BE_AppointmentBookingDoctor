import { Component, OnInit,Input } from '@angular/core';
import { IdoctorPopular } from '../doctorPopular.model';
@Component({
  selector: 'app-doctor-widget',
  templateUrl: './doctor-widget.component.html',
  styleUrls: ['./doctor-widget.component.css']
})
export class DoctorWidgetComponent implements OnInit {
  @Input() doctor:any;
  
  constructor() { }

  ngOnInit(): void {
  }


}
