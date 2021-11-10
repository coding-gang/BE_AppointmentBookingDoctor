import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nameOrEmail:string=''
  password:string =''
  constructor(private authenService:AuthService,private  router:Router) { }

  ngOnInit(): void {
  }
    // @ts-ignore
  login(frmLogin:any){
        const isDoctorlogin = frmLogin.nameOrEmail.includes('@');
        if(isDoctorlogin){
          const doctor={
             email:frmLogin.nameOrEmail,
             password:frmLogin.password
          }
           this.authenService.login(doctor,'doctor').subscribe(data =>{
             if(data.status === 'success'){
                this.authenService.getInfoStoreToken(data.token).subscribe(data=>{
                  console.log(data)
                });
                this.router.navigate([this.authenService.url])
               this.authenService.url ='';
             }
          })
        }
  }
}
