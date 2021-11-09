import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admins.service';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  namePage:string ="Create admin"
  nameComponent:string = "Create admin"
  userName:string =""
  password:string =""
  confirmPass:string = ""
  mouseover:boolean = false
  constructor(private adminService:AdminService,private router:Router) { }

  ngOnInit(): void {
  }

  addAdmin(frmAddAdmin:any){
    frmAddAdmin.roleId = 1
  this.adminService.addAdmin(frmAddAdmin).subscribe(mess =>{
    if(mess.status === "success"){
           this.router.navigate(['/dashboard/admins'])
    }
  })
  }
}
