import { HttpHandler, HttpInterceptor, HttpRequest,HttpEvent,  HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs"
import { catchError} from "rxjs/operators";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { IMessage } from "../interface/Imessage.model";
@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor(private toash:ToastrService){}
    intercept(req:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>> {
                        return next.handle(req).pipe(
                         catchError((err):Observable<any>=>{
                           if(err instanceof HttpErrorResponse){
                            const error =err.error;
                            const message:IMessage ={
                               status:error.status,
                               message:error.message
                             }
                             this.toash.error(message.message,message.status)
                          return throwError(message.status);
                           }
                           return next.handle(req)
                      })
                       )
    }
}
