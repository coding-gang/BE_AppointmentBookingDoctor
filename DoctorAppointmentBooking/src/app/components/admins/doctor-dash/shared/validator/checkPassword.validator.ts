import {AbstractControl,ValidationErrors, ValidatorFn } from "@angular/forms";

export function checkPassConfirmValidator(newPass:string):ValidatorFn{
       return (control:AbstractControl):ValidationErrors | null =>{
       const controlNewPass = control.parent?.get(newPass);
        if(controlNewPass && controlNewPass.value !== control.value )
        return {"errConfirmPass":"Password not matches"}
        else
        {
          return null
        }
     }
}
