import ICart_detail from "./CartDetail";
import IOrder_detail from "./OrderDetail";
import IProduct from "./Product";

export default interface IProduct_item {
  id: number;
  color: string;
  size: string;
  quantity: number;
  image: string[];
  product: IProduct;
  productID: number;
  Cart_detail: ICart_detail[];
  Order_detail: IOrder_detail[];
}