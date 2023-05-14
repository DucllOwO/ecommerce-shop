import { publicRequest, userRequest } from "../api";
import { IUser } from "../../interface/User";

export function fetchAllVouchers(){
  return userRequest.get(`/voucher`);
};