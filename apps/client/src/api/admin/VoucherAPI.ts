import { http } from "..";
import IVoucher from "../../interface/Voucher";

export function fetchAllVouchers(){
  return http.get(`/voucher`);
};

export function createVoucher({ code, name, discount, due, description} : IVoucher) {

}