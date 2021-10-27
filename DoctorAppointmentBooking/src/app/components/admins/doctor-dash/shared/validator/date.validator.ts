import { AbstractControl,ValidationErrors,ValidatorFn } from "@angular/forms";
import * as moment from "moment";

export function dateValidator():ValidatorFn{
    return (control:AbstractControl):ValidationErrors | null =>{
      if (control && control.value && !moment(control.value, 'DD/MM/YYYY', true).isValid()) {
        return { 'dateVaidator': true };
      }
      return null;
    }
}
