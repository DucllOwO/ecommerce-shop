import Cart from "./Cart";
import Product_item from "./ProductItem";

export default interface Cart_detail {
  id: number;
  quantity: number;
  cart: Cart;
  cartID: number;
  product_item: Product_item;
  itemID: number;
}