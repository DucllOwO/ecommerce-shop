import ICollection from "./Collection";
import IProduct from "./Product";
import ITag from "./Tag";


export default interface IDiscount {
  id: number;
  discount: number;
  name: string;
  Tag: ITag[];
  Collection: ICollection[];
  Product: IProduct[];
}