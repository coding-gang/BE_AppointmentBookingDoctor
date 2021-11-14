import { Routes } from '@angular/router';
import { DoctorFileComponent } from './components/doctor-file/doctor-file.component';
import { HomesComponent } from './components/home/homes-component/homes-component.component';
import { BookingComponent } from './components/booking/booking.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import {LoginComponent} from "./components/login/login.component";
import {MainComponent} from "./components/home/main/main.component";
import {BreadCrumbBarComponent} from "./components/bread-crumb-bar/bread-crumb-bar.component";
import {DoctorDetailComponent} from "./components/doctor-detail/doctor-detail.component";
import {BookingDoctorComponent} from "./components/booking-doctor/booking-doctor.component";

export const appRoutesHome:Routes = [

  {
    path:'login',component:LoginComponent
  },
  {
    path:'dashboard',
    //'./admins/admins.modules#AdminsModule',
    loadChildren: () => import('./components/admins/admins.module').then(m => m.AdminsModule)
  },
  {
    path:'', component:MainComponent,
    children:[
      {
        path:'home',component:HomesComponent,
      },
      {
        path:'doctor-profile',component:DoctorDetailComponent
      },

      {
        path:'doctor-profile/:id',component:DoctorDetailComponent
      },
      {
        path:'doctor-profile/:id/booking',component:BookingDoctorComponent
      },
      {
        path:'',redirectTo:'home',pathMatch:'full'
      }
    ]
  }
  // { path: '**', redirectTo: 'home'}

]
