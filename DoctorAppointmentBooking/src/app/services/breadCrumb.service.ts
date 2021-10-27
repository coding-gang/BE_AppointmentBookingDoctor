import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { of ,from } from "rxjs";
import { map , findIndex ,take } from "rxjs/operators";
import { IBreadCrumb } from "../components/bread-crumb-bar/bread-crumb.model";

let BreadCrumbs:IBreadCrumb[] =[];

@Injectable()
export class BreadCrumbsService{

  constructor(){
  }
  InitBreadCrumb(router:Router,activatedRoute:ActivatedRoute):IBreadCrumb[]{
    const isExistRouteConfig = activatedRoute.routeConfig && activatedRoute.routeConfig?.data;
      let lable = isExistRouteConfig ?
                  activatedRoute.routeConfig?.data?.breadcrumb :'';
      let url = isExistRouteConfig ? router.url :'';
      const breadCrumbLengh  = url.split('/');
      const dashboardBread =  2;// default dashborad index = 2
      const breadCrumCurrent = breadCrumbLengh.length;//4
         if((breadCrumCurrent - dashboardBread) === 1){
             BreadCrumbs.pop();
         }
      let indexExist =0;
      const isExist =  from(BreadCrumbs)
          .pipe(
            findIndex((el)=> el.url === url)
            );
            isExist.subscribe(index => indexExist =index);
            if(indexExist !== -1){
                of(BreadCrumbs)
                .pipe(map(el => el.slice(0,indexExist+1)))
                .subscribe(el => BreadCrumbs = [...el]);
            }else{
              BreadCrumbs = [...BreadCrumbs,{lable,url}]
            }
          return BreadCrumbs;
  }
}
