import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html'

})
export class SpecialitiesComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      200: {
        items: 2
      },
      240: {
        items: 3
      },
      340: {
        items: 4
      }
    },
    nav: true
  }

}
