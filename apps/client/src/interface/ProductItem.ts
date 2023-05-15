import Cart_detail from "./CartDetail";
import Order_detail from "./OrderDetail";
import Product from "./Product";

export default interface Product_item {
  id: number;
  color: string;
  size: string;
  quantity: number;
  image: string[];
  product: Product;
  productID: number;
  Cart_detail: Cart_detail[];
  Order_detail: Order_detail[];
}