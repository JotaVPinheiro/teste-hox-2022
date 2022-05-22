export default class Product {
  name: string;
  manufacturedDate: Date;
  perishable: boolean;
  expirationDate?: Date;
  price: number;
  id?: number;

  constructor(
    name: string,
    manufacturedDate: Date,
    perishable: boolean,
    expirationDate: Date,
    price: number
  ) {
    this.name = name;
    this.manufacturedDate = manufacturedDate;
    this.perishable = perishable;
    this.expirationDate = perishable ? expirationDate : undefined;
    this.price = price;
  }
}
