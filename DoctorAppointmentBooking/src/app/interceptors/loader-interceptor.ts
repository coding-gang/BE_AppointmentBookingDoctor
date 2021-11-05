import { HttpHandler, HttpInterceptor, HttpRequest,HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { finalize ,delay, tap, map} from "rxjs/operators";
import { Injectable } from "@angular/core";
import { IMessage } from "../interface/Imessage.model";
import { ToastrService } from "ngx-toastr";
@Injectable()
export class LoaderInterceptor implements HttpInterceptor{
    constructor(private spinner:NgxSpinnerService,
                private toash:ToastrService ){}
    intercept(req:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>> {
              if(req.method !== 'GET'){
                    this.spinner.show();
                      return next.handle(req).pipe(
                          delay(1500),
                          tap((res:any)=> {if(res.body){
                              const body:IMessage = res.body;
                              this.toash.success(body.message,body.status)
                          }}),
                          finalize(()=> this.spinner.hide())
                        )
              }else{
                return next.handle(req);
              }
    }
}
