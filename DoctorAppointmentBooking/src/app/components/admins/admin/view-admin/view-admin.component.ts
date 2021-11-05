import { Component, ElementRef, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admins.service';
import { ActivatedRoute } from '@angular/router';
import { IAdmin } from 'src/app/interface/Iadmin/admin.model';
@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css']
})
export class ViewAdminComponent implements OnInit ,AfterViewInit {
  namePage:string='Profile';
  nameComponent:string='Profile';
  isActiveAbout:boolean =true;
  isActiveEdit:boolean =false;
  public admin:any
  @ViewChild('modalchild')modalchild!:ElementRef
  constructor(private adminService:AdminService,
              private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAdminById();
  }

  ngAfterViewInit(){
    fromEvent(this.modalchild.nativeElement,'click').pipe(
      map( (el:any) => el.target.className)
   )
   .subscribe(el => el === 'modal fade show' ? this.isActiveEdit = false : this.isActiveEdit)
  }
    activeTab(){
      this.isActiveAbout = true
  }


  activeTabPass(){
  this.isActiveAbout =false
  }
  displayShow(){
    if(this.isActiveEdit)
    return "block";
    else
      return "none"
  }

  offModal(){
    this.isActiveEdit =false;
  }
  editAdmin(){
    this.isActiveEdit =true;
  }
  saveChange(formValue:FormGroup){
    this.router.paramMap.pipe(
      map(param => param.get('id')),
      switchMap(id=> this.adminService.addAdminById(id,formValue))
    ).subscribe(res=>res.status == 'success'
     ? this.isActiveEdit= false : this.isActiveEdit)
  }

  getAdminById(){
     const admin = this.router.paramMap.pipe(
         map(param => param.get('id')),
         switchMap((id) => this.adminService.getAllAdminById(id))
       )

       admin.subscribe(ad =>{
          this.admin = this.adminService.viewAdmin(ad)[0];
        });

  }
  }
