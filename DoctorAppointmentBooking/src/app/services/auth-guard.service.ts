import {
  RouterStateSnapshot,
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  CanActivateChild,
  CanDeactivate,
  UrlTree
} from "@angular/router";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";
import {checkDeactivate} from "../interface/checkDeactivate.model";
import {Observable, of} from "rxjs";

@Injectable()
export class AuthGuardService implements CanActivateChild, CanDeactivate<checkDeactivate> {
  constructor(private authenService: AuthService,
              private router: Router) {
  }

  canDeactivate
  (component: checkDeactivate,
   currentRoute: ActivatedRouteSnapshot,
   currentState: RouterStateSnapshot,
   nextState?: RouterStateSnapshot): boolean{
    return component.checkDeactivate(currentRoute,currentState,nextState)
    }

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
