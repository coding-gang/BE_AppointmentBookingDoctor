import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { Routes,RouterModule } from '@angular/router';

const routes: Routes =[
   {
     path:'admin',component:AdminComponent,
     children:[
      {
        path:'**',redirectTo:'/admin'
      }
     ]
   }

]
@NgModule({
  declarations: [
    AdminComponent,
    NavbarAdminComponent,
    SidebarAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    AdminComponent,
    NavbarAdminComponent,
    SidebarAdminComponent
  ]
})
export class AdminsModule { }
