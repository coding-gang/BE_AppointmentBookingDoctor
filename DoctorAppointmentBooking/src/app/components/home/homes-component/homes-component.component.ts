import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-homes-component',
  template: `
    <app-banner></app-banner>
    <app-specialities></app-specialities>
    <app-popular></app-popular>
    <app-availabe-features></app-availabe-features>
  `
})
export class HomesComponent implements OnInit {
  authenticated:boolean=false
  constructor(  private auth:AuthService) { }

  ngOnInit(): void {

  }
  isAuthenticated(){
    if(this.auth.Authenticated()){
      this.authenticated =true
    } else{
      this.authenticated =false
    }
  }

  logout(){
    this.auth.logOut();
    this.authenticated =false;
  }

}



