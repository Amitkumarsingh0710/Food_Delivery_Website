import { Component } from '@angular/core';
import { UserModel } from '../model/UserModel';
import { UserService } from '../services/user-service';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { customEmailValidator } from '../directive/emailValidator';
import { dateValidator } from '../directive/dateValidator';
import { phoneNumberValidator } from '../directive/phoneNumberValidator';
import { zipCodeValidator } from '../directive/zipCode';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile {

  
  currentUser: UserModel = {
    id: 1,
    name: '',
    email: '',
    dob: '',
    password: '',
    address: { flatNo: 0, landmark: '', street: '', city: '', state: '', zipCode: '', district: '' },
    phone: '',
    role: ''
  };


  originalUser!: UserModel;//

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }
  editForm !: FormGroup;
  userSubscription !:any;
  ngOnInit(): void {
   this.userSubscription = this.userService.currentUser$.subscribe(user => {
      if (user && this.currentUser) {
        this.currentUser = { ...user };
        this.originalUser = { ...user };
      }
      console.log('Current user updated inside-Edit-profile:', this.currentUser);
    });

    this.editForm = this.fb.group({
      name: [this.currentUser?.name || '', Validators.required],
      email: [this.currentUser?.email || '', [Validators.required, new customEmailValidator()]],
      dob: [this.currentUser?.dob || '', [new dateValidator]],
      phone: [this.currentUser?.phone || '', [new phoneNumberValidator()]],
      role: [this.currentUser?.role || '', Validators.required],
      address: this.fb.group({
        flatNo: [this.currentUser?.address?.flatNo || '', Validators.required],
        landmark: [this.currentUser?.address?.landmark || '', Validators.required],
        street: [this.currentUser?.address?.street || '', Validators.required],
        city: [this.currentUser?.address?.city || '', Validators.required],
        state: [this.currentUser?.address?.state || '', Validators.required],
        district: [this.currentUser?.address?.district || ''],
        zipCode: [this.currentUser?.address?.zipCode || '', [Validators.required, new zipCodeValidator()]]
      })
    });

    this.editForm.valueChanges.subscribe((val) => {
      console.log("Form value changed...");
      console.log(val);
      this.currentUser = { ...val };

    })

  }

  isChanged(): boolean {
    if (!this.currentUser || !this.originalUser) {
      return false;
    }
    else {
      console.log("The Current User...")
      console.log(this.currentUser);
      console.log("The Original List...");
      console.log(this.originalUser);
      return JSON.stringify(this.currentUser) !== JSON.stringify(this.originalUser);
    }

  }
  updatedUser !: UserModel;
  onSubmit() {
    this.userService.currentUser$.subscribe(user => {
      if (user && this.currentUser) {
        this.currentUser = { ...user };
        this.originalUser = { ...user };
      }
    })

    let users = this.userService.getUsers();
    console.log(users)
    let index = users.findIndex((u) => u.password === this.currentUser.password)
    console.log("Index found ... " + index);
    this.updatedUser = { ...this.editForm.value, password: this.currentUser.password, id: this.currentUser.id };

    this.userService.updateUser(this.updatedUser);
    this.router.navigate(['/']);
  } 

  ngOnDestroy(){
     this.userSubscription.unsubscribe();
  }
}




