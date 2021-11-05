import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AdminService } from 'src/app/services/admins.service';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css'],
})

export class ListAdminComponent implements OnInit {
  event$:any;
  namePage:string = 'List admins';
  nameComponent:string ="List admins";
 rows:any[] =[];
  editing:any = {};
  ColumnMode =ColumnMode;
  tablestyles:any ="bootstrap"
  constructor(private admins:AdminService) { }

  ngOnInit(): void {
   this.getAllAdmins();
  }

  updateValue(event:any, cell:any, rowIndex:any) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }

  getAllAdmins(){
     this.admins.getAllAdmin()
     .subscribe(data=>{
        this.rows= this.admins.viewAdmin(data);
      });
  }



}
