import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { Routes,RouterModule } from '@angular/router';
import { DoctorDashComponent } from './doctor-dash/doctor-dash.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable"
const routes: Routes =[
   {
     path:'dashboard',component:AdminComponent
   },
    {
      path:'dashboard/doctor',component:DoctorDashComponent
    }
]
@NgModule({
  declarations: [
    AdminComponent,
    NavbarAdminComponent,
    SidebarAdminComponent,
    DoctorDashComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule
  ],
  exports:[
    AdminComponent,
    NavbarAdminComponent,
    SidebarAdminComponent,
    DoctorDashComponent,
  ]
})
export class AdminsModule { }
