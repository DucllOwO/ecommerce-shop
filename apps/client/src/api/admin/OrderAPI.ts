import { http } from "..";

export function fetchWaitingOrders(){
  return http.get(`/order/waiting`);
};

export function fetchCompletedOrders(){
  return http.get(`/order/completed`);
};
