import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { DoctorPopularService } from 'src/app/services/popular.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent implements OnInit {

namePage:string='Profile';
nameComponent:string='Profile';
 fullName!: FormControl;
 phone!: FormControl;
 DOB!: FormControl;
 address!: FormControl;
 gender!:FormControl;
 viewForm!:FormGroup;
 localtion:string ="Viet Nam,Dalat"
 avatar:string =''
 isActiveAbout:boolean =true;

  constructor(private doctorService:DoctorPopularService,private route:ActivatedRoute) { }

  ngOnInit(): void {
       this.fullName =new FormControl();
       this.phone = new FormControl();
       this.DOB =new FormControl();
       this.address =new FormControl();
       this.gender =new FormControl();
       this.viewForm =new FormGroup({
         fullName:this.fullName,
         phone :this.phone,
         dob :this.DOB,
         address:this.address,
       })
   this.initDoctorProfile();

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
      switchMap(id=> this.doctorService.getDoctorById(id))
    );
     doctor.subscribe(doc =>{
         this.doctorService.viewDoctorProfile(doc)?.subscribe(
              item => {
                this.fullName.setValue(item.fullName);
                this.DOB.setValue(item.DOB);
                this.address.setValue(item.address);
                this.avatar =item.avatar;
                this.phone.setValue(item.phone)
              }
         );
    })
  }

}
