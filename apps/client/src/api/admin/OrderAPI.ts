import { userRequest } from "../api";
import { IProduct } from "../../interface/Product";

export function fetchWaitingOrders(){
  return userRequest.get(`/order/waiting`);
};

export function fetchCompletedOrders(){
  return userRequest.get(`/order/completed`);
};
