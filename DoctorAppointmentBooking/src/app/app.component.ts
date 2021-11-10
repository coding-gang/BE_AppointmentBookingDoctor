import {AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnInit, Output} from '@angular/core';
import { Router,NavigationStart, Event as NavigationEvent } from '@angular/router';
import {AuthService} from "./services/auth.service";
@Component({
  selector: 'app-root',
  template: `
   <ng-container *ngIf="isAmin ==='dashboard';then dashboard  else notAdmin"></ng-container>
   <ng-template #notAdmin>
     <ng-contaner *ngIf="isAmin === 'home';then client else login"></ng-contaner>
   </ng-template>
  <ng-template #client>
            <app-header [authenticated]="authenticated">
             <a loginSignup class="nav-link header-login" [routerLink]="['/login']">login / Signup </a>
              <a logout class="nav-link header-login" [ngStyle]="{ cursor: 'pointer'}" (click)="logout()">logout</a>
              </app-header>
             <router-outlet></router-outlet>

             <router-outlet></router-outlet>
             <app-footer></app-footer>
  </ng-template>

  <ng-template #dashboard>
        <app-navbar-admin></app-navbar-admin>
        <app-sidebar-admin></app-sidebar-admin>
         <router-outlet></router-outlet>
  </ng-template>
  <ng-template #login>
    <app-login></app-login>
  </ng-template>


  <ngx-spinner
  bdColor="rgba(51,51,51,0.8)"
  size="medium"
  color="#fff"
  type="ball-scale-ripple-multiple">
  <p style="font-size: 20px; color: white">Loading...</p>
</ngx-spinner>
              `
})
export class AppComponent implements OnInit,DoCheck {
  event$:any
  isAmin:string =''
  authenticated:boolean=false
  constructor(private router: Router,private auth:AuthService) {
  }

  ngOnInit(){
    this.isAdminRouteOutlet();
    this.isAuthenticated();
  }
 ngDoCheck() {
   this.isAuthenticated();
  }

  isAdminRouteOutlet(){
    this.event$ =this.router.events
    .subscribe(
      (event: NavigationEvent) => {
        if(event instanceof NavigationStart) {
           this.isAmin =event.url.split('/')[1];
        }
      });
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
