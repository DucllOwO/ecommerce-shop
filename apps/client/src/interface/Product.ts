import ICollection from "./Collection";
import IDiscount from "./Discount";
import IProduct_item from "./ProductItem";
import IReceiptDetail from "./ReceiptDetail";
import IReview from "./Review";
import ITag from "./Tag";

export default interface IProduct {
  id: number;
  name: string;
  price: number;
  description?: string | null;
  image: string[];
  view: number;
  sold: number;
  discount?: IDiscount | null;
  discountID?: number | null;
  tag: ITag;
  tagID: number;
  collection?: ICollection | null;
  collectionID?: number | null;
  ReceiptDetail: IReceiptDetail[];
  Review: IReview[];
  Product_item: IProduct_item[];
}