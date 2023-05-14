import { publicRequest, userRequest } from "../api";

export function fetchAllDiscounts(){
  return userRequest.get(`/discount`);
};