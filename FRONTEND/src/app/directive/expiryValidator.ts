import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';


@Directive({
    selector: '[expiryValid]',
    providers: [{ provide: NG_VALIDATORS, useExisting:expiryValid , multi: true }]
})
export class expiryValid implements Validator {
    validate(control: AbstractControl): ValidationErrors | null{
        const  date = control.value;
        if (date) {
             const newDate = new Date(control.value);
             const currentDate = new Date();
            newDate.setHours(0,0,0,0);
            currentDate.setHours(0,0,0,0);
           if (newDate.getTime() < currentDate.getTime()) {
               console.log("Invalid Date");
               return { invalidexpiryDate: true };
           }
        }
        return null;
      }
    }