import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBreadCrumb } from '../../bread-crumb-bar/bread-crumb.model';
import { BreadCrumbsService } from 'src/app/services/breadCrumb.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  @Input() namePage:string='';
  @Input() nameComponent:string='';
  BreadCrumbs:IBreadCrumb[] =[]

  constructor(private breadCrumbService:BreadCrumbsService,
              private router:Router,
              private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
   this.BreadCrumbs = this.breadCrumbService.InitBreadCrumb(this.router,this.activatedRoute);
  }
}
