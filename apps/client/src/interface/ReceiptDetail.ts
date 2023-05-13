import Product from "./Product";
import Receipt from "./Receipt";

export default interface ReceiptDetail {
  id: number;
  receipt: Receipt;
  receiptID: number;
  product: Product;
  productID: number;
}