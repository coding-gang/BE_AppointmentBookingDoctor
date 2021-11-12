import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";


@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent implements OnInit {
  authAdmin:unknown;
  constructor(private authenService:AuthService) { }

  ngOnInit(): void {
    this.authAdmin =this.authenService.getNameRole();
  }

}
