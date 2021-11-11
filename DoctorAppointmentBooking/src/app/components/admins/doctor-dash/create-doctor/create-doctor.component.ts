import {Component, OnInit} from '@angular/core';
import { FormGroup ,  FormControl, Validators } from '@angular/forms';
import {dateValidator,phoneValidator} from "../shared/index";
import { DoctorPopularService } from 'src/app/services/popular.service';
import {ICreateDoctor} from 'src/app/interface/Idoctor/index';
import { IMessage } from 'src/app/interface/Imessage.model';
import { Router } from '@angular/router';
import {SpecialitiesService} from "../../../../services/specialities.service";
import {ISpeciality} from "../../../../interface/ISpecialities";
import {checkDeactivate} from "../../../../interface/checkDeactivate.model";

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css']
})


export class CreateDoctorComponent implements OnInit ,checkDeactivate{
  Specialities:ISpeciality[]=[];
  namePage:string = 'New doctor';
  nameComponent:string ="New doctor";
  createDoctorForm!: FormGroup
  private specialities!:FormControl;
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
  constructor(private doctorService:DoctorPopularService,
              private specialityService:SpecialitiesService,
              private router:Router) {
   }
  ngOnInit(): void {
    this.getAllSpecialities();
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
      this.roleId =new FormControl("6");
      this.password =new FormControl("123");
      this.specialities =new FormControl(this.Specialities);
      this.createDoctorForm =new FormGroup({
        firstName:this.firstName,
        lastName :this.lastName,
        phone:this.phone,
        DOB:this.DOB,
        gender:this.gender,
        address:this.address,
        password: this.password,
          specialityId:this.specialities,
        roleId:this.roleId,
        mail:this.email
      },
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
  getAllSpecialities(){
    this.specialityService.getSpecialties().subscribe(
      data=>this.Specialities = this.specialityService.viewSpecialties(data.specialities)
    );
  }
  addDoctor(formValues:ICreateDoctor){

      this.doctorService.AddDoctor(formValues)
       .subscribe((mes:IMessage) =>mes.status === 'success'
                 ? this.router.navigateByUrl('/dashboard/doctor')
                 : this.router.navigateByUrl(this.router.url))
  }

  checkDeactivate(): boolean {
   const fName = this.createDoctorForm.getRawValue().firstName;
   const lName = this.createDoctorForm.getRawValue().lastName;
   const dob =this.createDoctorForm.getRawValue().DOB;
   const address =this.createDoctorForm.getRawValue().address;
   const email =this.createDoctorForm.getRawValue().mail;
  const phone =this.createDoctorForm.getRawValue().phone;
    return (phone && fName && lName && dob && address && email !== ''
            || confirm("Bạn không muốn tạo doctor?"));
  }
}
