import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
   isShow:boolean =false;
  constructor() { }

  ngOnInit(): void {
  }
  showMenu(){
    if(this.isShow)
      this.isShow = false;
    else
      this.isShow =true;
  }
}
