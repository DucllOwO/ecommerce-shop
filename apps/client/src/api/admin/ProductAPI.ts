import { publicRequest, userRequest } from "../api";
import { IProduct } from "../../interface/Product";

export function fetchAllProducts(){
  return userRequest.get(`/product`);
};