import { HttpHandler, HttpInterceptor, HttpRequest,HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { finalize ,delay} from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor{
    constructor(private spinner:NgxSpinnerService){}
    intercept(req:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>> {
              if(req.method !== 'GET'){
                    this.spinner.show();
                        return next.handle(req).pipe(
                          delay(1500),
                          finalize(()=> this.spinner.hide())
                        )
              }else{
                return next.handle(req);
              }
    }
}
