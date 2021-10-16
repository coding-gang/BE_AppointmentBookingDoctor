import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppComponent } from './app.component';
import { MyPipeDate } from './common/my-pipe';
import { RouterModule } from '@angular/router';
import { appRoutesHome } from './routes';
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
    HomesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule,
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
