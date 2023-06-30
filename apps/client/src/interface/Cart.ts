import ICart_detail from "./CartDetail";
import IProduct_item from "./ProductItem";
import IUser from "./User";

export default interface ICart {
  id: number;
  owner: IUser;
  userID: string;
  quantity: number;
  itemID: number;
  product_item: IProduct_item;
}