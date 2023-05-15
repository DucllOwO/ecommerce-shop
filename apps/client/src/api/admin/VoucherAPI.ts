import { http } from "..";

export function fetchAllVouchers(){
  return http.get(`/voucher`);
};