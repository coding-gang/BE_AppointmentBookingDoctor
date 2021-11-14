import
{
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  Component,
  Input,
  OnInit,
  ViewChild, AfterViewInit, ChangeDetectorRef
}
  from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
const PATH ='../../../assets/img/features/';
import {BreadCrumbBarComponent} from "../bread-crumb-bar/bread-crumb-bar.component";
import {IBreadCrumb} from "../bread-crumb-bar/bread-crumb.model";
import {Event as NavigationEvent, NavigationStart, Router} from "@angular/router";
import {BreadCrumbsService} from "../../services/breadCrumb.service";

interface album{
  src: string,
  caption: string,
  thumb:string
}

@Component({
  selector: 'app-doctor-file',
  templateUrl: './doctor-file.component.html'
})

export class DoctorFileComponent implements OnInit {
  breadcrumbComp!:ComponentRef<BreadCrumbBarComponent>
  BreadCrumbs:IBreadCrumb[]=[]
  @ViewChild('breadCrumb',{read:ViewContainerRef}) breadTempl!:ViewContainerRef
  public _albums:Array<album> = [];
  isBar = true;
  @Input() name:string ='';
  event$:any
  constructor(private componentFactoryResolver:ComponentFactoryResolver,
              private _lightbox:Lightbox,
              private router:Router,
              private breadCrumbService:BreadCrumbsService,
              private  cdr:ChangeDetectorRef) {

    for (let i = 1; i <= 4; i++) {
      const src = `${PATH}feature-0${i}.jpg`;
      const caption = 'Image' + `feature-0${i}.jpg`;
      const album:album = {
         src: src,
         caption: caption,
         thumb:''
      };
      this._albums.push(album);
    }
   }

  ngOnInit(): void {
    this.name ="Doctor profile";
  }


  open(index: number): void {
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    this._lightbox.close();
  }


}

