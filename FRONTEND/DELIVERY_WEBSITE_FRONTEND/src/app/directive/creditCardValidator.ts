/*import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';


@Directive({
    selector: '[card-Number]',
    providers: [{ provide: NG_VALIDATORS, useExisting: cardNumberValidator, multi: true }]
})
export class cardNumberValidator implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        const cardRegex = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/;
        if (!control.value) {
            console.log('No card number provided');
            return null; 
        }

        const valid = cardRegex.test(control.value);
        return valid ? null : { invalidCardNumber: true };
    }

}
*/



import { Directive, HostListener, ElementRef, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
    selector: '[card-Number]',
    providers: [
        { 
            provide: NG_VALIDATORS, 
            useExisting: forwardRef(() => cardNumberValidator), // Use forwardRef for safety
            multi: true 
        }
    ]
})
export class cardNumberValidator implements Validator {

    // 1. Inject ElementRef to access the input DOM element
    constructor(private el: ElementRef) {}

    // 2. Add HostListener to listen for 'input' events
    @HostListener('input', ['$event'])
    onInputChange(event: any) {
        const input = this.el.nativeElement as HTMLInputElement;
        
        // Remove all non-digit characters
        let trimmed = input.value.replace(/\D/g, '');


        if (trimmed.length > 16) {
            trimmed = trimmed.substring(0, 16);
        }

        // Add space after every 4 digits
        // logic: capture groups of 4 digits and join them with a space
        const parts = [];
        for (let i = 0; i < trimmed.length; i += 4) {
            parts.push(trimmed.substring(i, i + 4));
        }
        
        input.value = parts.join(' ');
    }

    validate(control: AbstractControl): ValidationErrors | null {
      
        const cardRegex = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/; 

      

        if (!control.value) {
            return null; 
        }

        const valid = cardRegex.test(control.value);
        return valid ? null : { invalidCardNumber: true };
    }
}


