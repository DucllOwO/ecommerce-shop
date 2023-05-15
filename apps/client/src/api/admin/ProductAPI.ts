import { http } from "..";

export function fetchAllProducts(){
  return http.get(`/product`);
};

export function fetchAllTag(){
  return http.get(`/tag`);
}

export function fetchTag(id: number){
  return http.get(`/tag/${id}`);
}

export function fetchAllCollection(){
  return http.get(`/collection`);
}

export function fetchCollection(id: number){
  return http.get(`/collection/${id}`);
}