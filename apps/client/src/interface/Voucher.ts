import IReceipt from "./Receipt";

export default interface IVoucher {
  code: string;
  name: string;
  discount: number;
  description?: string | null;
  due: Date;
  Receipt: IReceipt[];
  isActive: boolean
}