import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { DoctorPopularService } from 'src/app/services/popular.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import {ICreateDoctor, IDoctorProfile} from 'src/app/interface/Idoctor/index';
import {dateValidator,phoneValidator} from "../shared/index";
import { IMessage } from 'src/app/interface/Imessage.model';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent implements OnInit ,AfterViewInit{

namePage:string='Profile';
nameComponent:string='Profile';
firstName!:FormControl;
lastName!:FormControl
 fullName!: FormControl;
 phone!: FormControl;
 DOB!: FormControl;
 address!: FormControl;
 gender!:FormControl;
 spec!:FormControl;
 specialityId!:FormControl
 roleId!:FormControl;
 viewForm!:FormGroup
 localtion:string ="Viet Nam,Dalat"
 avatar:string =''
 isActiveAbout:boolean =true;
  isActiveEdit:boolean =false;
 idDoctor!:any;


  @ViewChild('modalchild')modalchild!:ElementRef
  constructor(private doctorService:DoctorPopularService,
             private route:ActivatedRoute,private router:Router) {
              this.initDoctorProfile();
               }

  ngOnInit(): void {

    const validatorsName =[Validators.required,
      Validators.pattern('[a-zA-Z].*'),
      Validators.maxLength(10)]
      this.firstName =new FormControl("",validatorsName);
      this.lastName =new FormControl("",[Validators.required,Validators.pattern('[a-zA-Z].*'),
                          Validators.maxLength(20)]);
      this.fullName =new FormControl()
      this.address =new FormControl("",Validators.required);
      this.phone =new FormControl("",[Validators.required,
                        phoneValidator(/^\d+$/)]);
      this.DOB =new FormControl("",[Validators.required,dateValidator()]);
      this.gender =new FormControl("",Validators.required)
      this.specialityId = new FormControl(2);
        this.roleId = new FormControl(2);
       this.viewForm =new FormGroup({
         fistName:this.firstName,
         lastName:this.lastName,
         phone :this.phone,
         dob :this.DOB,
         gender:this.gender,
         address:this.address,
         specialityId:this.specialityId,
         roleId:this.roleId,
         fullName:this.fullName,
       })


  }
  ngAfterViewInit(){
    fromEvent(this.modalchild.nativeElement,'click').pipe(
       map( (el:any) => el.target.className)
    )
    .subscribe(el => el === 'modal fade show' ? this.isActiveEdit = false : this.isActiveEdit)

  }
  validFirstNameCreateDoctor(){
    return this.firstName.valid || this.firstName.untouched
  }
  validLastNameCreateDoctor(){
    return this.lastName.valid || this.lastName.untouched
  }
  validPhoneCreateDoctor(){
    return this.phone.valid || this.phone.untouched
  }
  validAdressCreateDoctor(){
    return this.address.valid || this.address.untouched
  }
  validGenderCreateDoctor(){
    return this.gender.valid || this.gender.untouched
  }
  validDoBCreateDoctor(){
    return this.DOB.valid || this.DOB.untouched
  }


  activeTab(){
       this.isActiveAbout = true
  }
  activeTabPass(){
    this.isActiveAbout =false
  }

  initDoctorProfile(){
    const doctor=  this.route.paramMap.pipe(
      map(param => param.get('id')),
      switchMap(id => this.doctorService.getDoctorById(id))
    );
     doctor.subscribe(doc =>{
         this.doctorService.viewDoctorProfile(doc)?.subscribe(
              item => {
                this.idDoctor =item.doctorId
                this.fullName.setValue(item.fullName);
                this.firstName.setValue(item.firstName);
                this.lastName.setValue(item.lastName);
                this.DOB.setValue(item.DOB);
                this.address.setValue(item.address);
                this.avatar =item.avatar;
                this.phone.setValue(item.phone)
              }
         );
    })
  }
  editDoctor(){
    this.isActiveEdit =true;

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

  saveChange(formChange:ICreateDoctor){
     this.doctorService.updateDoctorById(this.idDoctor,formChange)
     .subscribe((mes:IMessage) => {

       if( mes.status === 'success'){
          this.router.navigateByUrl(this.router.url);
        this.isActiveEdit = !this.isActiveEdit;
       }
      })
  }
}
