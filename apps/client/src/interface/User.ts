import Account from "./Account";
import Cart from "./Cart";
import { Feedback } from "./Feedback";
import Order from "./Order";
import Receipt from "./Receipt";
import Review from "./Review";

export default interface User {
  id: string;
  firstname: string;
  lastname?: string;
  phone_number?: string;
  address?: string;
  avatar?: string;
  product_viewed?: string[];
  account?: Account;
  email: string;
  Feedback?: Feedback[];
  Review?: Review[];
  Cart?: Cart[];
  Order?: Order[];
  Receipt?: Receipt[];
}