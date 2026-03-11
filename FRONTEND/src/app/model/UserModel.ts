import { AddressModel } from "./addressModel";
export interface UserModel{
  _id?:string;
  username: string;
  email: string;
  dateofBirth: string;
  password: string;
  address: AddressModel;
  phoneNumber?: string;
  role?:string
}