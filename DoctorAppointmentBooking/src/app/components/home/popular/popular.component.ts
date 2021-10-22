import
{AfterViewInit,
Component,
ComponentFactoryResolver,
ComponentRef,
OnInit,TemplateRef,ViewChild ,ViewContainerRef,Input }
 from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DoctorPopularService } from './popular.service';
import { IdoctorPopular } from './doctorPopular.model';
import { DoctorWidgetComponent } from '..';
import { isNgTemplate } from '@angular/compiler';
@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html'
})

export class PopularComponent implements OnInit {
  doctorPopular:IdoctorPopular[] =[];

  constructor(private doctorPopularService :DoctorPopularService){}

   ngOnInit() {
    this.ViewDoctorPopular();
  }
    ViewDoctorPopular(){
      this.doctorPopularService.getAllDoctors().subscribe(doc =>{


        this.doctorPopular = this.doctorPopularService.viewPopularDoctor(doc);
     })
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
      500: {
        items: 3
      },
      940: {
        items: 4
      },
      1140: {
        items: 3
      },
      1340: {
        items: 4
      },
      1540: {
        items: 4
      }
    },
    nav: true
  }
}
