export interface cartItem{
    _id?:string,
    // Prefer `name` in the UI; keep `itemName` for compatibility with some code paths
    itemName?: string,
    // Optional image fields present in different frontends/backends
    imagePath?: string,
    quantity: number,
    price:number
}