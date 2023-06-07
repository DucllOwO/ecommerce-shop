import IOrder_detail from "./OrderDetail";
import IReceipt from "./Receipt";
import IUser from "./User";

export default interface IOrder {
  id: number;
  date: Date;
  total_cost: number;
  status: string;
  firstname: string;
  lastname: string;
  phone_number: string; 
  address: string;     
  buyer: IUser;
  userID: string;
  Receipt: IReceipt[];
  Order_detail: IOrder_detail[];
}