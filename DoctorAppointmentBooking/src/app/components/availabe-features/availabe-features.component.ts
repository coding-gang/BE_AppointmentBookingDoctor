import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-availabe-features',
  templateUrl: './availabe-features.component.html'
 
})
export class AvailabeFeaturesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    center:true,
    navSpeed: 600,
    responsive: {
      0: {
        items: 1
      },
      200: {
        items: 2
      },
      440: {
        items: 3
      },
      640: {
        items: 4
      },
      940: {
        items: 5
      }
    
    }
  }

}
