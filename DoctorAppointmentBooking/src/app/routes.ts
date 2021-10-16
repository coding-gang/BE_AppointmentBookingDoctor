import { Routes } from '@angular/router';
import { DoctorFileComponent } from './components/doctor-file/doctor-file.component';
import { HomesComponent } from './components/home/homes-component/homes-component.component';


export const appRoutesHome:Routes = [
  {
      path:'home',component:HomesComponent,

  },
  {
    path:'doctor-profile',component:DoctorFileComponent
  },
  {
    path:'',redirectTo:'home',pathMatch:'full'
  },
  { path: '**', redirectTo: 'home'}

]
