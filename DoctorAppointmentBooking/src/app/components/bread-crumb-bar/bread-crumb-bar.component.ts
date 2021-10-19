import { Component, OnInit,Input,ViewChild ,ViewContainerRef,TemplateRef, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-bread-crumb-bar',
  templateUrl: './bread-crumb-bar.component.html'

})
export class BreadCrumbBarComponent implements OnInit,AfterViewInit {
  @Input() name:string ='';
  @ViewChild('barContainer',{read:ViewContainerRef ,static:true})
 public barContainerView!:ViewContainerRef;
  @ViewChild('nameDoctor',{static:true})
  public templateNameDoctor!:TemplateRef<any>;
  constructor() {
   }

  ngOnInit(): void {
    this.barContainerView.createEmbeddedView(this.templateNameDoctor,
      {name:this.name,color:'breadcrumb-title'});
  }
  ngAfterViewInit():void{

  }

}
