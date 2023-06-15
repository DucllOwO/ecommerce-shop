import ICollection from "./Collection";
import IDiscount from "./Discount";
import { IHaveTag } from "./HaveTag";
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
  slug: string;
  isActive: boolean;
  discount?: IDiscount | null;
  discountID?: number | null;
  collection?: ICollection | null;
  collectionID?: number | null;
  ReceiptDetail: IReceiptDetail[];
  Review: IReview[];
  HaveTag: IHaveTag[];
  product_item: IProduct_item[];
}