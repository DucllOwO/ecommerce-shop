import Collection from "./Collection";
import Product from "./Product";
import Tag from "./Tag";


export default interface Discount {
  id: number;
  discount: number;
  Tag: Tag[];
  Collection: Collection[];
  Product: Product[];
}