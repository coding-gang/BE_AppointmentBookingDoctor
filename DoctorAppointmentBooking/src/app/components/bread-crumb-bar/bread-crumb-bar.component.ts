import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-bread-crumb-bar',
  templateUrl: './bread-crumb-bar.component.html'

})
export class BreadCrumbBarComponent implements OnInit {
  @Input() name:string ='';

  constructor() { }

  ngOnInit(): void {

  }

}
