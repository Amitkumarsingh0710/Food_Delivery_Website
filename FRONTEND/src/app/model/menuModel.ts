export interface MenuModel{
  _id: string;              // Unique identifier
  itemName: string;         // Name of the menu item
  description?: string;      // Description of the item
  price: number;     
  imagePath?: string,       // Price in INR
  createdAt?: string;        // ISO date string
  updatedAt?: string;        // ISO date string              // Version key (from MongoDB)
}
