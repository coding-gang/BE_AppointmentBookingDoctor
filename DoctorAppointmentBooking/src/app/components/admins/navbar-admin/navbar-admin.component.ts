import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
   isShow:boolean =false;
   username:string =''
   nameRole:string=''
   constructor(private authService:AuthService) { }

  ngOnInit(): void {
     this.initInfoUser();
  }

  initInfoUser(){
    const token =  localStorage.getItem('access_token');
     // @ts-ignore
    this.authService.getInfoStoreToken(token).subscribe(data=>{
         this.username = `${data.lastName} ${data.firstName}`;
         this.nameRole =data.nameRole;
    });
  }

  showMenu(){
    this.isShow = !this.isShow;
  }

  logout(){
     this.authService.logOut();
  }
}
