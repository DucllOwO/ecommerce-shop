import { http } from "..";

export function fetchWaitingOrders(){
  return http.get(`/order/waiting`);
};

export function fetchCompletedOrders(){
  return http.get(`/order/completed`);
};

export function finishOrder(id: number){
  return http.patch(`/order/${id}`, {status: '1'});
};
