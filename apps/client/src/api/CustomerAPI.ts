import { http } from ".";

export function fetchAllProducts(){
  return http.get(`/product`);
};

export function fetchProductDetail(where: any){
  return http.get(`/product`, {params: where})
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
  return http.get(`/receipt`, newReceipt);
}