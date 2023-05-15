import IDiscount from "./Discount";
import IProduct from "./Product";

export default interface ICollection {
  id: number;
  name: string;
  discount?: IDiscount;
  discountID?: number;
  Product: IProduct[];
}






