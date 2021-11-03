import { HttpHandler, HttpInterceptor, HttpRequest,HttpEvent,  HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs"
import { catchError} from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor(){}
    intercept(req:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>> {
                        return next.handle(req).pipe(
                         catchError((err):Observable<any>=>{
                           if(err instanceof HttpErrorResponse){
                            const error =err.error;
                            const message:any ={
                               status:error.status,
                               message:error.message
                             }
                          return throwError(message);
                           }
                           return next.handle(req)
                      })
                       )
    }
}
