import { http } from "..";
import IProduct from "../../interface/Product";

export function fetchAllProducts(){
  return http.get(`/product`);
};

export function fetchAllTag(){
  return http.get(`/tag`);
}

export function fetchTag(id: number){
  return http.get(`/tag/${id}`);
}

export function fetchAllCollection(){
  return http.get(`/collection`);
}

export function fetchCollection(id: number){
  return http.get(`/collection/${id}`);
}

export function postProduct(newProduct: any){
  return http.post(`/product`, newProduct)
}

export function uploadImage(newImage: FormData){
  return http.post(`/image`, newImage);
}