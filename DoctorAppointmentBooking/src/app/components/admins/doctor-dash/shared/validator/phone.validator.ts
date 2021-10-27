import { AbstractControl,ValidationErrors,ValidatorFn } from "@angular/forms";

export function phoneValidator(pattern:any):ValidatorFn{
    return (control:AbstractControl):ValidationErrors | null =>{
        if(control.value.length === 0) return null;
        const valid = pattern.test(control.value) && control.value.length<11;
        return valid ? null :{'phone':"phone number incorrect"};
    }
}
