import { http } from "..";
import IProduct from "../../interface/Product";

export function fetchAllProducts(){
  return http.get(`/product`);
};

export function fetchAllCollection(){
  return http.get(`/collection`);
}

export function fetchCollection(id: number){
  return http.get(`/collection/${id}`);
}

export function postProduct(newProduct: any){
  return http.post(`/product`, newProduct)
}

export function uploadImage(newImage: FormData){
  return http.post(`/image`, newImage);
}

export function updateProduct(newProduct: any, id: number){
  return http.patch(`/product/${id}`, newProduct);
}

export function deleteImage(fileURL: string){
  return http.delete(`/image/${fileURL}`);
}

export function fetchActiveProduct(){
  return http.get(`/product/active`)
}