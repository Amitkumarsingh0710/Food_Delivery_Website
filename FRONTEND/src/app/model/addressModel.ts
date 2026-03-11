export interface AddressModel{
  flatNo: number|string;
  landmark : string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  district?: string;
}