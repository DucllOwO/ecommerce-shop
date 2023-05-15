import Product from "./Product";
import User from "./User";

export default interface Review {
  id: number;
  comment?: string | null;
  rate: number;
  author: User;
  authorID: string;
  product: Product;
  productID: number;
}