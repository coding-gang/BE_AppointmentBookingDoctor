import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppComponent } from './app.component';
import { MyPipeDate } from './common/my-pipe';
import { RouterModule } from '@angular/router';
import { appRoutesHome } from './routes';
import { LightboxModule } from 'ngx-lightbox';
// directive customer
import { EventHoverDirective } from './directives/event.directive';
//importService , component home
import {
  HeaderComponent,
  BannerComponent,
  SpecialitiesComponent,
  PopularComponent,
  DoctorWidgetComponent,
  AvailabeFeaturesComponent,
  FooterComponent,
  SpecialitiesService,
  DoctorPopularService
} from './components/home/index';
import { DoctorFileComponent } from './components/doctor-file/doctor-file.component';
import { HomesComponent } from './components/home/homes-component/homes-component.component';
import { BookingComponent } from './components/booking/booking.component';
import { BreadCrumbBarComponent } from './components/bread-crumb-bar/bread-crumb-bar.component';
import { DoctorComponent } from './components/doctor/doctor.component';

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
    FooterComponent,
    DoctorFileComponent,
    HomesComponent,
    BookingComponent,
    BreadCrumbBarComponent,
    DoctorComponent,
    EventHoverDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule,
    LightboxModule,
    RouterModule.forRoot(appRoutesHome)
  ],
  providers:[
    SpecialitiesService,
    DoctorPopularService,
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [
    AppComponent
  ],


})
export class AppModule { }
