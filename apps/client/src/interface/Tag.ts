import IDiscount from "./Discount";
import { IHaveTag } from "./HaveTag";
import IProduct from "./Product";


export default interface ITag {
  id: number;
  name: string;
  discount?: IDiscount;
  discountID?: number;
  HaveTag: IHaveTag
}