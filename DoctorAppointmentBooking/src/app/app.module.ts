import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
//import { CarouselComponent } from 'ngx-owl-carousel-o/ngx-owl-carousel-o';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { SpecialitiesComponent } from './components/specialities/specialities.component';
import { PopularComponent } from './components/popular/popular.component';
import { DoctorWidgetComponent } from './components/popular/doctor-widget/doctor-widget.component';
import { MyPipeDate } from './common/my-pipe';
//importService
import {SpecialitiesService} from './components/specialities/specialities.service';
import { DoctorPopularService } from './components/popular/popular.service';
import { AvailabeFeaturesComponent } from './components/availabe-features/availabe-features.component';
import { FooterComponent } from './components/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    SpecialitiesComponent,
    PopularComponent,
    DoctorWidgetComponent,
    MyPipeDate,
    AvailabeFeaturesComponent,
    FooterComponent
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule 
  ],
  providers:[
    SpecialitiesService,
    DoctorPopularService],
  bootstrap: [AppComponent]
})
export class AppModule { }
