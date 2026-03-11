import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MenuService } from '../services/menu-service';
import { MenuModel } from '../model/menuModel';
import { CommonModule } from '@angular/common';
import { UserModel } from '../model/UserModel';
import { UserService } from '../services/user-service';
import { ViewCartService } from '../services/view-cart-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-section-items',
  imports: [CommonModule, FormsModule],
  templateUrl: './section-items.html',
  styleUrl: './section-items.css',
})

export class SectionItems {
  sectionName!: string;
  items: MenuModel[] = [];
  menuItems !: MenuModel[];
  currentUser !: UserModel | null;
  subscription:any;
  searchTerm: string = '';

  constructor(private menuService: MenuService, private userService: UserService, private viewCartService: ViewCartService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.sectionName = this.route.snapshot.paramMap.get('sectionName')!;
    this.menuItems = this.menuService.getItemsBySection(this.sectionName);
    this.subscription = this.userService.currentUser$.subscribe((user) => {
      this.currentUser = user; 
      console.log('Current user updated:', this.currentUser);
    });
  }

  
  onSearchChange() {
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      this.menuItems = this.menuService.searchItemsInSection(this.sectionName, this.searchTerm);
    } else {
      this.menuItems = this.menuService.getItemsBySection(this.sectionName);
    }
  }
  
  handleEdit(itemId: string) {
    this.router.navigate(['/editMenu', itemId])
  }


  handleDelete(menuID: string, section: string) {
    const userConfirmed = confirm("Are you sure you want to delete this menu item?")
    if (userConfirmed) {
      this.menuService.deleteMenu(menuID, section);
      this.menuItems = this.menuService.deleteMenu(menuID, section);
    }
    else {
      alert("Deletion cancelled by user.");
    }
  }

  handleAddToCart(itemId: string, section: string) {
    if (!this.currentUser) {
      alert("Currently You are not Logged-in!")
      this.router.navigate(['/login']);
    }
    else {
      const item = this.menuItems.find(ele => ele.itemId === itemId);
      if (item) {
        this.viewCartService.addToCart({
          userId:this.currentUser.id,
          itemId: item.itemId,
          section: section,
          itemName: item.name,
          quantity: 1,
          price: item.price
        });
        alert("Added to the Cart!");
      }
    }
  }


   ngOnDestory(){
        this.subscription.unsubscribe();
    }
}