import Discount from "./Discount";
import Product from "./Product";


export default interface Tag {
  id: number;
  name: string;
  discount?: Discount;
  discountID?: number;
  Product: Product[];
}