import {Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {fromEvent, Observable, Subscription} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admins.service';
import { ActivatedRoute } from '@angular/router';
import { IAdmin } from 'src/app/interface/Iadmin/admin.model';
import {AuthService} from "../../../../services/auth.service";
@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css']
})
export class ViewAdminComponent implements OnInit ,AfterViewInit ,OnDestroy {
  oldPass:string='';
  newPass:string ='';
  confirmPass:string ='';
  namePage:string='Profile';
  nameComponent:string='Profile';
  isActiveAbout:boolean =true;
  isActiveEdit:boolean =false;
  public admin:any;
  checkMySelf!:boolean
  unSubscriber:Subscription =new Subscription();
  @ViewChild('modalchild')modalchild!:ElementRef
  constructor(private adminService:AdminService,
              private router:ActivatedRoute,
              private authen:AuthService) { }
   subscriber = {
    next: (id: any) =>{
      if(this.authen.isLogin()){
        const idToken = this.authen.getId();
        this.checkMySelf = idToken.toString() === id;
      }
    } ,
    error: (err: Error) => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };
  ngOnInit(): void {
    this.getAdminById();
   this.unSubscriber =  this.isSelf().subscribe(this.subscriber);
  }

  ngAfterViewInit(){
    fromEvent(this.modalchild.nativeElement,'click').pipe(
      map( (el:any) => el.target.className)
   ).subscribe(el => el === 'modal fade show' ? this.isActiveEdit = false : this.isActiveEdit)
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
      switchMap(id=> this.adminService.updateAdminById(id,formValue))
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

  updatePass(frmUpdatePass:FormGroup){
    this.unSubscriber = this.router.paramMap.pipe(
      map(param=>param.get('id')),
      switchMap(id=>this.adminService.updatePass(id,frmUpdatePass))
    ).subscribe()
  }

  isSelf():Observable<any>{
    // @ts-ignore
   return new Observable<any>(subscriber => {
     this.router.paramMap.pipe(
       map(param=> param.get('id'))
     ).subscribe(id=>{
       subscriber.next(id);
     })
   })
  }

  ngOnDestroy() {
    this.unSubscriber.unsubscribe();
  }

}
