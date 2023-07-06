import { http } from ".";
import ICart from "../interface/Cart";

export function fetchAllProducts(){
  return http.get(`/product`);
};

export function fetchProductDetail(where: any){
  return http.get(`/product`, {params: where})
}

export function increaseViewForProduct(id: number) {
  return http.post(`/product/viewed/${id}`);
}

export function fetchProduct(id: number){
  return http.get(`/product/${id}`)
}

export function createOrder(order: any){
  return http.post('/order', order)
}

export function getVoucher(voucherCode: string, isActive: boolean = true){ 
  return http.get(`/voucher/${voucherCode}?isActive=${isActive}`)
}

export function createReceipt(newReceipt: any){
  return http.post(`/receipt`, newReceipt);
}

export function updateUser(newUser: any, userID: number){
  return http.patch(`/user/${userID}`, newUser)
}

export function getOrdersByUserID(userID: any){
  return http.get(`/order?user=${userID}`)
}

export function getOrder(id: string){
  return http.get(`/order/${id}`);
}

export function getCart(userID: string){
  return http.get(`/cart/?userID=${userID}`);
}

export function updateCart(cartID: number, updateFields: any){
  return http.patch(`/cart/${cartID}`, updateFields);
}

export function createCart(newCart: any){
  return http.post(`/cart`, newCart);
}

export function deleteCart(cartID: number){
  // console.log(cartID)
  return http.delete(`/cart/${cartID}`);
}