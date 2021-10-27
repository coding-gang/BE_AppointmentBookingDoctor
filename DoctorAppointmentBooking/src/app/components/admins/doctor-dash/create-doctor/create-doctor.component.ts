import {Component, OnInit} from '@angular/core';
import { FormGroup ,  FormControl, Validators } from '@angular/forms';
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
 private phone!: FormControl;
 private email!: FormControl;
 private dob!: FormControl;
 private address!: FormControl;
 private gender!:FormControl;
 lName:any
  mouseover:any

  constructor() {
   }

  ngOnInit(): void {
      this.firstName =new FormControl("",Validators.required);
      this.lastName =new FormControl("",Validators.required);
      this.address =new FormControl("",Validators.required);
      this.phone =new FormControl("",Validators.required);
      this.email =new FormControl("",Validators.required);
      this.dob =new FormControl("",Validators.required);
      this.gender =new FormControl("",Validators.required);
      this.createDoctorForm =new FormGroup({
        firstName:this.firstName,
        lastName :this.lastName,
        address:this.address,
        phone:this.phone,
        email:this.email,
        dob:this.dob,
        gender:this.gender
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
  validEmailCreateDoctor(){
    return this.email.valid || this.email.untouched
  }
  validGenderCreateDoctor(){
    return this.gender.valid || this.gender.untouched
  }
  validDoBCreateDoctor(){
    return this.dob.valid || this.dob.untouched
  }

  addDoctor(formValues:any){
         console.log(formValues);
  }
}
