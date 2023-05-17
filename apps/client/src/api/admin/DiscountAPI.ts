import { http } from "..";

export function fetchAllDiscounts(){
  return http.get(`/discount`);
};

export function createDiscount(name: string, discount: number) {
  return http.post('/discount', { name, discount })
}

export function deleteDiscount(id: number) {
  return http.delete(`/discount/${id}`);
}