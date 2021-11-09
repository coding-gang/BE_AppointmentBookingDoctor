import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { IAdmin } from "../interface/Iadmin/admin.model";
import { IAdmins } from "../interface/Iadmin/admins.model";
import { IMessage } from "../interface/Imessage.model";

@Injectable()
export class AdminService{

constructor(private httpClient:HttpClient) {}

  getAllAdmin():Observable<IAdmins>{
    return this.httpClient.get<IAdmins>('api/v1/admins');
  }


  getAllAdminById(id:any):Observable<IAdmins>{
    return this.httpClient.get<IAdmins>(`api/v1/admin/${id}`);
  }
  updateAdminById(id:any,username:any):Observable<IMessage>{
    return this.httpClient.put<IMessage>(`api/v1/admin/${id}`,username);
  }

  viewAdmin(data:IAdmins){
    let admins:IAdmin[]=[]
      from(data.admins).subscribe(ad=>admins.push(ad));
      return admins;
  }

  addAdmin(admin:any):Observable<IMessage>{
    return this.httpClient.post<IMessage>(`api/v1/admin/new/`,admin);
  }
}
