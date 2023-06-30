import { http } from './index';

export function fetchOrderByID(id: number) {
  return http.get(`/order/${id}`)
}