import { publicRequest, userRequest } from "../api";

export function fetchAllCustomers(){
  return userRequest.get(`/user`);
};