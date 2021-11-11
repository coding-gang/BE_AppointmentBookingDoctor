import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Iauthen} from "../interface/Iauth.model";
import {ILogin} from "../interface/ILogin.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string=''
   helper = new JwtHelperService();
  constructor(private  http : HttpClient,private router:Router) { }

  login(data:any,namePath:string):Observable<ILogin>{
        return this.http.post<ILogin>(`api/v1/${namePath}/login`,data);
  }

  isLogin():boolean{
   const storeToken =  localStorage.getItem("access_token");
   if(storeToken !== null){
     return true;
   }
   else{
     return false;
   }
  }

  getInfoStoreToken(token:string):Observable<Iauthen>{
     localStorage.setItem("access_token",token);
    const decodedToken =  this.helper.decodeToken(token);
    const data:Iauthen ={
         id:decodedToken.doctorId,
         firstName:decodedToken.firstName,
         lastName:decodedToken.lastName,
         nameRole:decodedToken.nameRole
    }
    return of(data);
  }

  getNameRole():string{
  const token =  localStorage.getItem("access_token");
    // @ts-ignore
    const decodedToken =  this.helper.decodeToken(token);
    return decodedToken.nameRole;
  }

  getId():number{
    const token =  localStorage.getItem("access_token");
    // @ts-ignore
    const decodedToken =  this.helper.decodeToken(token);
    return decodedToken.doctorId;
  }
  isExpiredToken():boolean{
    const token = localStorage.getItem("access_token");
   // @ts-ignore
    return  !this.helper.isTokenExpired(token);
  }

  logOut(){
    localStorage.removeItem("access_token");
    this.router.navigate(['/home'])
  }
  Authenticated():boolean{
   return this.isLogin() && this.isExpiredToken();
  }

}
