import Cart_detail from "./CartDetail";
import User from "./User";

export default interface Cart {
  id: number;
  owner: User;
  userID: string;
  Cart_detail: Cart_detail[];
}