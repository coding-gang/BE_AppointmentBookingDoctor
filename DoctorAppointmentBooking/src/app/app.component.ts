import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
             <app-header></app-header>
             <router-outlet></router-outlet>

             <router-outlet></router-outlet>
             <app-footer></app-footer>
              `
})
export class AppComponent implements OnInit {

  ngOnInit(){

  }

}
