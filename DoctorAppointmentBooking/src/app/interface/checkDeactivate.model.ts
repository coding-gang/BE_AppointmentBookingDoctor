import {Observable} from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

export  interface  checkDeactivate{
  checkDeactivate(
   currentRoute:ActivatedRouteSnapshot,
    currentState:RouterStateSnapshot,
    nextState?:RouterStateSnapshot
    ):boolean
}
