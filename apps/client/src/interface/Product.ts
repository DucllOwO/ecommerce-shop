import Collection from "./Collection";
import Discount from "./Discount";
import Product_item from "./ProductItem";
import ReceiptDetail from "./ReceiptDetail";
import Review from "./Review";
import Tag from "./Tag";

export default interface Product {
  id: number;
  name: string;
  price: number;
  description?: string | null;
  image: string[];
  view: number;
  sold: number;
  discount?: Discount | null;
  discountID?: number | null;
  tag: Tag;
  tagID: number;
  collection?: Collection | null;
  collectionID?: number | null;
  ReceiptDetail: ReceiptDetail[];
  Review: Review[];
  Product_item: Product_item[];
}