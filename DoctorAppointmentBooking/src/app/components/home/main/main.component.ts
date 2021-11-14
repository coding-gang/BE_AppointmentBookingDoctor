import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit,DoCheck {
  authenticated:any
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }
  ngDoCheck() {
    this.isAuthenticated();
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
