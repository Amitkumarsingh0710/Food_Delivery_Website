import { Injectable } from '@angular/core';
import { MenuModel } from '../model/menuModel';
import { MenuSection } from '../model/menuSection';
import { populateMenuList } from '../dataLayer/menuList';
@Injectable({
  providedIn: 'root',
})
export class MenuService {


menuSections: MenuSection[] = populateMenuList();


getMenu(): MenuSection[]{ 
  return this.menuSections; 
}
   
getMenuItemById(itemId: string): MenuModel | undefined {
  for (const section of this.menuSections) {
    const found = section.items.find(item => item.itemId === itemId);
    if (found) return found;
  }
  return undefined;
}

editMenu(itemId:string, updatedItem:MenuModel){
     for(let section of this.menuSections){
          let index = section.items.findIndex((ele)=>ele.itemId === itemId);
          if(index >= 0){
              section.items[index] = {...updatedItem,imgurl:section.items[index].imgurl};
          }
     }
}

 deleteMenu(itemId:string,section:string){
     let index = this.menuSections.findIndex(ele =>ele.sectionName === section);
     this.menuSections[index].items = this.menuSections[index].items.filter((ele)=> ele.itemId !== itemId);
     return this.menuSections[index].items; 
 }

 addMenu(newMenu:MenuModel,section:string){
     let index = this.menuSections.findIndex((ele)=>ele.sectionName === section);
     if(index >= 0){
          let genItemId = Math.floor(Math.random()*(300-200+1))+100;
          let id = `ST${genItemId}` 
          this.menuSections[index].items.push({...newMenu,itemId:id,restaurantId:"R001",imgurl: "./assets/genericImg.jpg"}); ;
     }
 }


 searchItemsInSection(sectionName:string, searchTerm:string): MenuModel[] {
  const section = this.menuSections.find(sec => sec.sectionName === sectionName);
  if (!section) return [];  
  const lowerSearchTerm = searchTerm.toLowerCase();
  return section.items.filter(item => 
    item.name.toLowerCase().includes(lowerSearchTerm)
  );
 }


 getItemsBySection(sectionName: string): MenuModel[] {
  const section = this.menuSections.find(sec => sec.sectionName === sectionName);
  return section ? section.items : [];
 }
 
}
