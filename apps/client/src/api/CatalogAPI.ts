import { publicRequest } from "./api";
import { Product } from "../interface/Product";

export function fetchProduct(){
  return publicRequest.get(`/product`);
};