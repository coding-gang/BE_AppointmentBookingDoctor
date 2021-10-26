import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
      console.log(lable);
      console.log(url);
     // BreadCrumbs.push({lable,url});
     BreadCrumbs = [...BreadCrumbs,{lable,url}]
      return BreadCrumbs;
  }
}
