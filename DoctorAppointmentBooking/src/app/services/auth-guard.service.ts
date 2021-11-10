import {RouterStateSnapshot, CanActivate, Router, ActivatedRouteSnapshot, CanActivateChild} from "@angular/router";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export  class AuthGuardService implements  CanActivateChild{
  constructor(private  authenService : AuthService,
              private router:Router) {}
  canActivateChild(route: ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const isLogin = this.authenService.isLogin();
    if(isLogin){
      const isActivate =  this.authenService.isExpiredToken();
      if(isActivate) return true;
      else{
        this.authenService.url = state.url
        this.router.navigate(['/login']);
        return false;
      }
    }else{
      this.authenService.url = state.url
      this.router.navigate(['/login']);
      return false;
    }


  }
}
