import {AbstractControl,ValidationErrors, ValidatorFn } from "@angular/forms";

export function checkPassConfirmValidator(newPass:string):ValidatorFn{
     return (control:AbstractControl):ValidationErrors |null =>{
       console.log(control.value)
       console.log(newPass)
       if(newPass === null || newPass === '') return null
                 if(control.value !== newPass )
                 return {"errConfirmPass":"Password not matches"}
                 else{
                  return null
                 }

     }
}
