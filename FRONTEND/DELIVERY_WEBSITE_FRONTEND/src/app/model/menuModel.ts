export interface MenuModel{
    itemId :string,
    name:string,
    description?:string,
    // Some backends use `desc` or other names; accept both
    desc?: string,
    price:number,
    restaurantId:string,
    imgurl?:string,
    imagePath?: string,
    image?: string
}