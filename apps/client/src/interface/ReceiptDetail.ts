import IProduct from "./Product";
import IReceipt from "./Receipt";

export default interface IReceiptDetail {
  id: number;
  receipt: IReceipt;
  receiptID: number;
  product: IProduct;
  productID: number;
}