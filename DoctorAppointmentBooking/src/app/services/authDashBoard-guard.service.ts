import {
  RouterStateSnapshot,
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  UrlTree
} from "@angular/router";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class AuthDashBoardGuardService implements CanLoad ,CanActivate {
  constructor(private authenService: AuthService,
              private router: Router) {
  }
  canLoad(route: Route, segments: UrlSegment[]):Observable<boolean> {
    const isLogin = this.authenService.isLogin();
    console.log("check")
    if(isLogin){
      const isActivate =  this.authenService.isExpiredToken();
      if(isActivate) {
        const isAdmin = this.authenService.getNameRole();
        if (isAdmin === 'admin' || isAdmin === 'doctor') {
          return of(true);
        }else{
         // this.router.navigate(['/home']);
          return of(false);
        }
      }
      else{
       // this.authenService.url = state.url
        //this.router.navigate(['/login']);
        return of(false);
      }
    }else{
      //this.authenService.url = state.url
      //this.router.navigate(['/login']);
      return of(false);
    }
  }
  canActivate(route: ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const isLogin = this.authenService.isLogin();
    if(isLogin){
      const isActivate =  this.authenService.isExpiredToken();
      if(isActivate) {
        const isAdmin = this.authenService.getNameRole();
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
