export interface cartItem{
    userId:number,
    itemId:string,
    section: string;
    // Prefer `name` in the UI; keep `itemName` for compatibility with some code paths
    name?: string;
    itemName?: string,
    // Optional image fields present in different frontends/backends
    imagePath?: string,
    image?: string,
    imgurl?: string,
    quantity: number,
    price:number
}