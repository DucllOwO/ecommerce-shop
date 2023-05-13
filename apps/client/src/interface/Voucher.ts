import Receipt from "./Receipt";

export default interface Voucher {
  code: string;
  name: string;
  discount: number;
  description?: string | null;
  due: Date;
  Receipt: Receipt[];
}