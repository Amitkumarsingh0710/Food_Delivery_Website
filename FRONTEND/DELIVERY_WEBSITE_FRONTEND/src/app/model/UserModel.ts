import { AddressModel } from "./addressModel";
export interface UserModel{
  id:number;
  name: string;
  email: string;
  dob: string;
  password: string;
  address: AddressModel;
  phone?: string;
  role?:string
}