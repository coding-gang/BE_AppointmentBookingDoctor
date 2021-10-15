import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ISpecialities } from './specialities.model';
import { SpecialitiesService  } from './specialities.service';

@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html'

})
export class SpecialitiesComponent implements OnInit {

  specialities:ISpecialities[] =[] 

  
  constructor(private specialitiesService:SpecialitiesService ) {
     
   }

  ngOnInit(): void {
    this.specialities = this.specialitiesService.getSpecialties() ;
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
      400: {
        items: 2
      },
      640: {
        items: 3
      },
      840: {
        items: 5
      },
      1140: {
        items: 5
      }
    
    }
  }

}
