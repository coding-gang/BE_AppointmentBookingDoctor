import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Subject, Subscription} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  nameOrEmail:string=''
  password:string =''
  data:Subscription =new Subscription()
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
               console.log(this.authenService.url)
               if(this.authenService.url === ''){
                 this.authenService.url ='/home';
               }
               this.data =  this.authenService.getInfoStoreToken(data.token).subscribe(()=>{
                 this.router.navigate([this.authenService.url])
                   this.authenService.url ='';
               }
               );
             }
          })
        }
  }
  ngOnDestroy() {
     this.data.unsubscribe()
  }
}
