import { http } from './index';
export function getVietQR(message: string, amount: number) {
  return http.get(`/payment/viet-qr?message=${message}&&amount=${amount}`);
}