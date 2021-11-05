import {Component, OnInit} from '@angular/core';
import { FormGroup ,  FormControl, Validators } from '@angular/forms';
import {dateValidator,phoneValidator} from "../shared/index";
import { DoctorPopularService } from 'src/app/services/popular.service';
import {ICreateDoctor} from 'src/app/interface/Idoctor/index';
import { IMessage } from 'src/app/interface/Imessage.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css']
})


export class CreateDoctorComponent implements OnInit {
  namePage:string = 'New doctor'
  nameComponent:string ="New doctor"

  createDoctorForm!: FormGroup

 private firstName!: FormControl;
 private lastName!:FormControl;
 public phone!: FormControl;
 private email!: FormControl;
 private DOB!: FormControl;
 private address!: FormControl;
 private gender!:FormControl;
 private password!:FormControl;
private specialityId!:FormControl;
private roleId!:FormControl;
  mouseover:any
  constructor(private doctorService:DoctorPopularService,private router:Router) {
   }
  ngOnInit(): void {
    const validatorsName =[Validators.required,
                          Validators.pattern('[a-zA-Z].*'),
                          Validators.maxLength(10)]
      this.firstName =new FormControl("",validatorsName);
      this.lastName =new FormControl("",[Validators.required,Validators.pattern('[a-zA-Z].*'),
                                        Validators.maxLength(20)]);
      this.address =new FormControl("",Validators.required);
      this.phone =new FormControl("",[Validators.required,
                                      phoneValidator(/^\d+$/)]);
      this.email =new FormControl("",[Validators.required,Validators.email]);
      this.DOB =new FormControl("",[Validators.required,dateValidator()]);
      this.gender =new FormControl("",Validators.required);
      this.roleId =new FormControl("2");
      this.specialityId =new FormControl("2");
      this.password =new FormControl("123");
      this.createDoctorForm =new FormGroup({
        firstName:this.firstName,
        lastName :this.lastName,
        phone:this.phone,
        DOB:this.DOB,
        gender:this.gender,
        address:this.address,
        password: this.password,
        specialityId:this.specialityId,
        roleId:this.roleId,
        email:this.email
      }

      )
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

  addDoctor(formValues:ICreateDoctor){

      this.doctorService.AddDoctor(formValues)
       .subscribe((mes:IMessage) =>mes.status === 'success'
                 ? this.router.navigateByUrl('/dashboard/doctor')
                 : this.router.navigateByUrl(this.router.url))
  }
}
