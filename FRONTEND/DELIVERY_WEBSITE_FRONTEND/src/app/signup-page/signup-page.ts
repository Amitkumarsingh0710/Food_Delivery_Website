import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../services/user-service';
import { Router, RouterLink } from '@angular/router';
import { dateValidator } from '../directive/dateValidator';
import { phoneNumberValidator } from '../directive/phoneNumberValidator';
import { confirmPasswordValidator } from '../directive/confirmPassword';
import { passwordValidator } from '../directive/passwordValidator';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {customEmailValidator}  from '../directive/emailValidator'
import { zipCodeValidator } from '../directive/zipCode';

@Component({
  selector: 'app-signup-page',
  imports: [FormsModule, CommonModule, RouterLink,ReactiveFormsModule],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.css',
})

export class SignupPage {
  signupForm!: FormGroup;
  constructor( private fb: FormBuilder, private userservice: UserService, private router: Router) { }
  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        name: ['', Validators.required], 
        email: ['', [Validators.required,new customEmailValidator()]],
        dob: ['', [Validators.required,new dateValidator()]],
         phone: ['', [Validators.required,new phoneNumberValidator()]],
        password: ['', [Validators.required,new passwordValidator()]], 
        confirmPassword: ['', [Validators.required,new confirmPasswordValidator()]],
        role: [''],
        address: this.fb.group({
          flatNo: ['', Validators.required],
          landmark: ['', Validators.required],
          street: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          district: [''],
          zipCode: ['', [Validators.required,new zipCodeValidator()]]
        })
      });
  }

  onSubmit() {
    console.log("Account Info feeded...")
    console.log("The form Data during Signup...");
    console.log(this.signupForm.value);
    console.log(this.signupForm.valid);
   if (this.signupForm.valid) { 
    const user = this.signupForm.value; 
    console.log('Form Submitted:', user);
      this.userservice.addUser(user)
      alert("Registration successful!");
      this.router.navigate(['/login'])
    }
  }
}

