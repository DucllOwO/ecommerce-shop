import IProduct from "./Product";
import IUser from "./User";

export default interface IReview {
  id: number;
  comment?: string | null;
  rate: number;
  author: IUser;
  authorID: string;
  product: IProduct;
  productID: number;
}