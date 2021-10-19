import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
             <app-header>
             <a loginSignup class="nav-link header-login" href="login.html">login / Signup </a>
              </app-header>
             <router-outlet></router-outlet>

             <router-outlet></router-outlet>
             <app-footer></app-footer>
              `
})
export class AppComponent implements OnInit {

  ngOnInit(){

  }

}
