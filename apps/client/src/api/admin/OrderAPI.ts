import { http } from "..";

export function fetchWaitingOrders(){
  return http.get(`/order/waiting`);
};

export function fetchCompletedOrders(){
  return http.get(`/order/completed`);
};

export function fetchCanceledOrders(){
  return http.get(`/order/canceled`);
};

export function fetchDeliveryOrders(){
  return http.get(`/order/delivery`);
};

export function finishOrder(id: number){
  return http.patch(`/order/${id}`, {status: '2'});
};
export function deliveryOrder(id: number){
  return http.patch(`/order/${id}`, {status: '1'});
};
export function cancelOrder(id: number){
  return http.patch(`/order/${id}`, {status: '3'});
};

export function fetchAllOrders(){
  return http.get(`/order`);
}
