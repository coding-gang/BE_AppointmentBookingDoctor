import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `	<div class="main-wrapper">  
             <app-header></app-header>
             <app-banner></app-banner>
             <app-specialities></app-specialities>
             <app-popular></app-popular>       
             <app-availabe-features></app-availabe-features>   
             <app-footer></app-footer>
              </div>            
              `
})
export class AppComponent {
}
