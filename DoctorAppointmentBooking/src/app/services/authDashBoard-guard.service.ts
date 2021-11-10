import {RouterStateSnapshot, CanActivate, Router, ActivatedRouteSnapshot, CanActivateChild} from "@angular/router";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export  class AuthDashBoardGuardService implements  CanActivate{
  constructor(private  authenService : AuthService,
              private router:Router) {}
  canActivate(route: ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const isLogin = this.authenService.isLogin();
    if(isLogin){
      const isActivate =  this.authenService.isExpiredToken();
      if(isActivate) {
        const isAdmin = this.authenService.getNameRole();
        console.log(isAdmin)
        if (isAdmin === 'admin' || isAdmin === 'doctor') {
          return true;
        }else{
          this.router.navigate(['/home']);
          return false;
        }
      }
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
