import { Routes } from '@angular/router';
import { DoctorFileComponent } from './components/doctor-file/doctor-file.component';
import { HomesComponent } from './components/home/homes-component/homes-component.component';
import { BookingComponent } from './components/booking/booking.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import {LoginComponent} from "./components/login/login.component";


export const appRoutesHome:Routes = [
  {
    path:'login',component:LoginComponent
  },
  {
    path:'dashboard',loadChildren: './admins/admins.modules#AdminsModule'
  },
  {
      path:'home',component:HomesComponent,
  },
  {
    path:'doctor-profile',component:DoctorComponent

  },
  {
    path:'doctor-profile/:id',component:DoctorFileComponent,
  },
  {
    path:'booking/:id',component:BookingComponent
  },
  {
    path:'',redirectTo:'home',pathMatch:'full'
  },
  { path: '**', redirectTo: 'home'}

]
