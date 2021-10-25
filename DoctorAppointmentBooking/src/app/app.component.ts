import { Component, OnInit, Output  } from '@angular/core';
import { Router,NavigationStart, Event as NavigationEvent } from '@angular/router';
@Component({
  selector: 'app-root',
  template: `
   <ng-container *ngIf="isAmin ==='dashboard';then dashboard else client"></ng-container>
  <ng-template #client>
            <app-header>
             <a loginSignup class="nav-link header-login" href="login.html">login / Signup </a>
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
              `
})
export class AppComponent implements OnInit {
  event$:any
  isAmin:string =''
  constructor(private router: Router) {
  }
  ngOnInit(){
    this.isAdminRouteOutlet();

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

}
