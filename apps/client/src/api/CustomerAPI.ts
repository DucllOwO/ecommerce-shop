import { publicRequest } from "./api";
import { Product } from "../interface/Product";

export function fetchAllProducts(){
  return publicRequest.get(`/product`);
};

export function fetchProduct(id: number){
  return publicRequest.get(`/product/${id}`)
}