import ICart from "./Cart";
import IProduct_item from "./ProductItem";

export default interface ICart_detail {
  id: number;
  quantity: number;
  cart: ICart;
  cartID: number;
  product_item: IProduct_item;
  itemID: number;
}