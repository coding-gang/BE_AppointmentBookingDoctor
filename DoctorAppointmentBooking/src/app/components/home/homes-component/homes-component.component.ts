import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homes-component',
  template: `
    <app-banner></app-banner>
    <app-specialities></app-specialities>
    <app-popular></app-popular>
    <app-availabe-features>
    </app-availabe-features>
  `
})
export class HomesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

