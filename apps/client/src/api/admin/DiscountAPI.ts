import { http } from "..";

export function fetchAllDiscounts(){
  return http.get(`/discount`);
};