import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `	<div class="main-wrapper">  
             <app-header></app-header>
             <app-banner></app-banner>
             <app-specialities></app-specialities>
             <app-popular></app-popular>          
              </div>            
              `
})
export class AppComponent {
}
