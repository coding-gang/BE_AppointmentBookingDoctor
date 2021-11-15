import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-begin-end-timings',
  templateUrl: './begin-end-timings.component.html',
  styleUrls: ['./begin-end-timings.component.css']
})
export class BeginEndTimingsComponent implements OnInit {
@Input()BeginTimings:string =''
  @Input()EndTimings:string=''
  constructor() { }

  ngOnInit(): void {
  }

}
