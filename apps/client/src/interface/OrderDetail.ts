import Order from "./Order";
import Product_item from "./ProductItem";

export default interface Order_detail {
  id: number;
  product_item: Product_item;
  itemID: number;
  order: Order;
  orderID: number;
}