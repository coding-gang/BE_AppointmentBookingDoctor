import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `	<div class="main-wrapper">  
             <app-header></app-header>
             <app-banner></app-banner>
             <app-specialities></app-specialities>          
              </div>            
              `
})
export class AppComponent {
}
