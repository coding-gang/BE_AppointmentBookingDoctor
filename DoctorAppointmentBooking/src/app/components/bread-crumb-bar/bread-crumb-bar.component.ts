import {
  Component,
  OnInit,
  AfterViewInit,
  DoCheck,
  Input, OnChanges, SimpleChanges,
} from '@angular/core';
import {ActivatedRoute, Event as NavigationEvent, NavigationStart, Router} from "@angular/router";
import {IBreadCrumb} from "./bread-crumb.model";
import {BreadCrumbsService} from "../../services/breadCrumb.service";
import {global} from "@angular/compiler/src/util";

@Component({
  selector: 'app-bread-crumb-bar',
  templateUrl: './bread-crumb-bar.component.html'
})
export class BreadCrumbBarComponent implements OnInit {
  name :string ='Home'
  event$:any
 @Input() breadCrumbs:IBreadCrumb[]=[]
  constructor() {
   }

  ngOnInit(): void {}
}
