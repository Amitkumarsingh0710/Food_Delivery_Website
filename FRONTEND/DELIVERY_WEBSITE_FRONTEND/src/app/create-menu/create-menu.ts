import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuService } from '../services/menu-service';
import { Route, Router } from '@angular/router';
import { nonNegativePriceDirective } from '../directive/negativePriceValidator';
@Component({
  selector: 'app-create-menu',
  imports: [FormsModule,CommonModule,nonNegativePriceDirective],
  templateUrl: './create-menu.html',
  styleUrl: './create-menu.css',
})
export class CreateMenu {
    constructor(private menuService : MenuService,private router:Router){}
    handleSubmit(myForm:NgForm){
        console.log("New Menu...");
        console.log(myForm.value);
        if(myForm.value){
            this.menuService.addMenu(myForm.value,myForm.value.sectionName)
        }
        alert("New Menu Add Succesfully...");
        this.router.navigate(['/']);
    }

}
