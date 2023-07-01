import { http } from './index';
export function getQRPayment(orderId: number, fullname: string, amount: number) {
  return http.get(`/payment/viet-qr?amount=${amount}&message=${orderId} ${fullname}`)
}