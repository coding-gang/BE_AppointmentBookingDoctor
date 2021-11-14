import { Injectable } from "@angular/core";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import { of ,from } from "rxjs";
import {map, findIndex, take, filter, toArray} from "rxjs/operators";
import { IBreadCrumb } from "../components/bread-crumb-bar/bread-crumb.model";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";

let BreadCrumbs:IBreadCrumb[] =[];

@Injectable()
export class BreadCrumbsService{
  index:any
  BreadCrumbs:IBreadCrumb[] =[]
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

  InitBreadCrumbFromEventRouter(event:NavigationStart){
      const url = event.url;
      const countUrl= event.url.split('/').length-1;
      const isParam = event.url.split('/')[countUrl];
      // @ts-ignore
      isNaN(isParam) ?  this.index = countUrl : this.index = countUrl-1
      const lable = event.url.split('/')[this.index];
      from(this.BreadCrumbs).pipe(
        filter(data => data.url !=='/home' && data.url !==url),
        //take(1),
        toArray()
      ).subscribe(val =>{
        if(url !== '/home'){
          if(this.BreadCrumbs.length >=2){
            if(url === this.BreadCrumbs[this.BreadCrumbs.length-2].url){
              val.pop()
            }
          }
          val.push({url,lable})
          this.BreadCrumbs = [...val]
        }else{
          val = [];
          this.BreadCrumbs = [...val]
        }
      })
      return this.BreadCrumbs
    }
}
