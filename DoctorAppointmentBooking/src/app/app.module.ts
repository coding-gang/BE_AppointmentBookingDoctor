import { NgModule ,CUSTOM_ELEMENTS_SCHEMA,} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppComponent } from './app.component';
import { MyPipeDate } from './common/my-pipe';
import { RouterModule } from '@angular/router';
import { appRoutesHome } from './routes';
import { LightboxModule } from 'ngx-lightbox';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { DoctorListResolver } from './components/admins/doctor-dash/shared/doctor-list-resolve';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderInterceptor } from './interceptors/loader-interceptor';
// directive customer
import { HandlerError } from './components/admins/shared/handlerError.service';
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
  DoctorPopularService
} from './components/home/index';
import { DoctorFileComponent } from './components/doctor-file/doctor-file.component';
import { HomesComponent } from './components/home/homes-component/homes-component.component';
import { BookingComponent } from './components/booking/booking.component';
import { BreadCrumbBarComponent } from './components/bread-crumb-bar/bread-crumb-bar.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { AdminsModule } from './components/admins/admins.module';
import { BreadCrumbsService } from './services/breadCrumb.service';
import { SpecialitiesService } from './services/specialities.service';
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
    RouterModule.forRoot(appRoutesHome),
    HttpClientModule,
    AdminsModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[
    SpecialitiesService,
    DoctorPopularService,
    BreadCrumbsService,
    DoctorListResolver,
    HandlerError,
    {
      provide: APP_BASE_HREF,
      useValue:'/'
    },
    {provide:HTTP_INTERCEPTORS,useClass:LoaderInterceptor,multi:true}
  ],
  bootstrap: [
    AppComponent
  ],


})
export class AppModule { }
