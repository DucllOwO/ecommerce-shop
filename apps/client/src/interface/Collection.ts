import Discount from "./Discount";
import Product from "./Product";

export default interface Collection {
  id: number;
  name: string;
  discount?: Discount;
  discountID?: number;
  Product: Product[];
}






