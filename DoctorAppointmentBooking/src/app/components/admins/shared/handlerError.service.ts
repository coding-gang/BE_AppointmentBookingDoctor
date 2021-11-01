import { Observable, of } from "rxjs";
import { IMessage } from "src/app/interface/Imessage.model";
export class HandlerError{
     constructor(){}
    public  Handler(){
    return (err:any):Observable<IMessage> =>{
          const error =err.error;
         const message ={
            status:error.status,
            message:error.message
       }
          return of(message)
        }
  }
}

