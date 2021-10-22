import { Routes } from '@angular/router';
import { DoctorFileComponent } from './components/doctor-file/doctor-file.component';
import { HomesComponent } from './components/home/homes-component/homes-component.component';
import { BookingComponent } from './components/booking/booking.component';
import { BreadCrumbBarComponent } from './components/bread-crumb-bar/bread-crumb-bar.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { AdminComponent } from './components/admins/admin/admin.component';
export const appRoutesHome:Routes = [
  {
    path:'admin',loadChildren: './admins/admins.modules#AdminsModule',
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
