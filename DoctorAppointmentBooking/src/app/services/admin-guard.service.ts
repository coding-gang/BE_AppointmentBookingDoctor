import {RouterStateSnapshot, CanActivate, Router, ActivatedRouteSnapshot, CanActivateChild} from "@angular/router";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export  class AdminGuardService implements  CanActivate{
  constructor(private  authenService : AuthService,
              private router:Router) {}
  canActivate(){
    const isAdmin =  this.authenService.getNameRole();
    if(isAdmin === "admin"){
        return true;
    }else{
        this.router.navigate(['/dashboard'])
        return false;
    }

  }
}
