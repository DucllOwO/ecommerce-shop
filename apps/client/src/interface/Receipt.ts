import ReceiptDetail from "./ReceiptDetail";
import User from "./User";
import Voucher from "./Voucher";

export default interface Receipt {
  id: number;
  date: Date;
  cost: number;
  status: string;
  voucher?: Voucher | null;
  voucherCode?: string | null;
  buyer: User;
  userID: string;
  ReceiptDetail: ReceiptDetail[];
}