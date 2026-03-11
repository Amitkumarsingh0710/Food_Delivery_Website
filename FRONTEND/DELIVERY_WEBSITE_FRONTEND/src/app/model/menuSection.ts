import { MenuModel } from "./menuModel";
export interface MenuSection { 
    sectionName: string;
    items: MenuModel[]; 
    imgurl?: string;
    imagePath?: string;
    image?: string;
}