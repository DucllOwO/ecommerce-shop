import { http } from "..";

export function fetchAllCustomers(){
  return http.get(`/user`);
};