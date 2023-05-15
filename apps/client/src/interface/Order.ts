import IOrder_detail from "./OrderDetail";
import IUser from "./User";

export default interface IOrder {
  id: number;
  date: Date;
  total_cost: number;
  status: string;
  buyer: IUser;
  userID: string;
  Order_detail: IOrder_detail[];
}