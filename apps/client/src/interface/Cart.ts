import ICart_detail from "./CartDetail";
import IUser from "./User";

export default interface ICart {
  id: number;
  owner: IUser;
  userID: string;
  Cart_detail: ICart_detail[];
}