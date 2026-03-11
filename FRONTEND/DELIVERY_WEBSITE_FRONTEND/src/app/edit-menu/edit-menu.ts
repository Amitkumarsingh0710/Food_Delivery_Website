import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../services/menu-service';
import { MenuModel } from '../model/menuModel';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { nonNegativePriceDirective } from '../directive/negativePriceValidator';
@Component({
  selector: 'app-edit-menu',
  imports: [FormsModule,CommonModule,nonNegativePriceDirective],
  templateUrl: './edit-menu.html',
  styleUrl: './edit-menu.css',
})

export class EditMenu {
  menu: MenuModel = {
    itemId: "",
    name: "",
    description: "",
    price: 0,
    restaurantId: "R001",
  };
  
  itemId !: string | null;
  constructor(private route: ActivatedRoute, private router: Router, private menuService: MenuService) { }
  ngOnInit(): void {
    this.route.params.subscribe((p)=>{
       this.itemId = p['id'];
    });
    if (this.itemId) {
      const item = this.menuService.getMenuItemById(this.itemId);
      if (item !== undefined) {
        this.menu = item;
      }
    }
  }

  update(formData: NgForm) {
    console.log("Menu details ...");
    console.log(formData.value);
    if (this.itemId) {
      this.menuService.editMenu(this.itemId, formData.value);
      alert("Menu Edited Successfully ...");
      this.router.navigate(['/']);
    }
  }

}
