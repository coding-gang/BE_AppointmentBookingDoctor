import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { Routes,RouterModule } from '@angular/router';
import { DoctorDashComponent } from './doctor-dash/doctor-dash.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { CreateDoctorComponent } from './doctor-dash/create-doctor/create-doctor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { ViewDoctorComponent } from './doctor-dash/view-doctor/view-doctor.component';
import { ModalconfirmDoctorComponent } from './doctor-dash/modalconfirm-doctor/modalconfirm-doctor.component';
import { DoctorListResolver } from './doctor-dash/shared/doctor-list-resolve';
import { SpecialitiesComponent } from './specialities/specialities.component';
const routes: Routes =[

   {
     path:'dashboard',component:DashboardComponent,
     children:[
      {
        path:'doctor',
        children:[
          {
            path:'new',component: CreateDoctorComponent,
            data:{
              breadcrumb:"new doctor"
            }
          },
          {
            path:':id',component:ViewDoctorComponent,
            data:{
              breadcrumb:"profile doctor"
            }
          },
          {
            path:'',component:DoctorDashComponent,
            data:{breadcrumb:"list doctor"},
            resolve:{Doctors:DoctorListResolver}
          }
        ]
      },
      {
        path:'specialities',component:SpecialitiesComponent,
        data:{
          breadcrumb:"Specialities"
        }
      },
      {
        path:'',redirectTo:'dashboard',pathMatch:'full'
      }
     ]
   }

]
@NgModule({
  declarations: [
    AdminComponent,
    NavbarAdminComponent,
    SidebarAdminComponent,
    DoctorDashComponent,
    CreateDoctorComponent,
    DashboardComponent,
    ViewDoctorComponent,
    ModalconfirmDoctorComponent,
    SpecialitiesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    AdminComponent,
    NavbarAdminComponent,
    SidebarAdminComponent,
    DoctorDashComponent,
    CreateDoctorComponent,
    DashboardComponent,
    ViewDoctorComponent,
    ModalconfirmDoctorComponent
  ],
})
export class AdminsModule { }