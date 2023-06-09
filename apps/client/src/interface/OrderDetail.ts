import IOrder from "./Order";
import IProduct_item from "./ProductItem";

export default interface IOrder_detail {
  id: number;
  product_item: IProduct_item;
  itemID: number;
  order: IOrder;
  quantity: number;
  orderID: number;
}