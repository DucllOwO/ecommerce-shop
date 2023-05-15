import { http } from ".";

export function fetchAllProducts(){
  return http.get(`/product`);
};

export function fetchProduct(id: number){
  return http.get(`/product/${id}`)
}