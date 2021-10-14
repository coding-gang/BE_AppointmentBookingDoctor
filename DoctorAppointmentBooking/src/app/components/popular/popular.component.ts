import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DoctorPopularService } from './popular.service';
import { IdoctorPopular } from './doctorPopular.model';
@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html'
})

export class PopularComponent implements OnInit {
   
  doctorPopular:IdoctorPopular[] =[];

  constructor(private doctorPopularService :DoctorPopularService) { }

  ngOnInit(): void {
     this.doctorPopular =this.doctorPopularService.getPopularDoctor();
     
  }
   
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 400,
    navText: ['<i class="fa fa-arrow-left fa-2x"></i>','<i class="fa fa-arrow-right fa-2x"></i>'],
    responsive: {
      0: {
        items: 1
      },
      100: {
        items: 2
      },
      140: {
        items: 3
      }
    },
    nav: true
  }
}
