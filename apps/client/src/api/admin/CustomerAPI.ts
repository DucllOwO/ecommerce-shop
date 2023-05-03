import { publicRequest, userRequest } from "../api";
import { IUser } from "../../interface/User";

export function fetchAllCustomers(){
  return userRequest.get(`/user`);
};