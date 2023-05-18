import * as dayjs from 'dayjs';
import { http } from "..";
import IVoucher from "../../interface/Voucher";

export function fetchAllVouchers(){
  return http.get(`/voucher`);
};

export function createVoucher({ code, name, discount, due, description} : IVoucher) {
  return http.post('/voucher', { code, name, discount, due, description });
}

export function updateVoucher({ code, name, discount, due, description }: IVoucher) {
  console.log({ name, discount, due, description })
  return http.patch(`/voucher/${code}`, { name, discount, due, description })
}

export function shutDownVoucher(code: string) {
  return http.patch(`/voucher/shutdown/${code}`)
}