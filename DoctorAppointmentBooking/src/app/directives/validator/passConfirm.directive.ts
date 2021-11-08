import { Directive, Input } from "@angular/core";
import { checkPassConfirmValidator }
 from "src/app/components/admins/doctor-dash/shared/validator/checkPassword.validator";
import {ValidationErrors, Validator, NG_VALIDATORS, AbstractControl } from "@angular/forms";

@Directive({
 selector : '[confirmPass][ngModel]',
 providers:[{provide:NG_VALIDATORS,useExisting:PasswordDirective,multi:true}]
})

export class PasswordDirective implements Validator{
 @Input() confirmPass:string=""

  validate(control:AbstractControl):ValidationErrors | null{
    console.log(this.confirmPass)
  return checkPassConfirmValidator(this.confirmPass)(control);
  }
}
