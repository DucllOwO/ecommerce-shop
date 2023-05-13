import Order_detail from "./OrderDetail";
import User from "./User";

export default interface Order {
  id: number;
  date: Date;
  total_cost: number;
  status: string;
  buyer: User;
  userID: string;
  Order_detail: Order_detail[];
}