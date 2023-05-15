import { publicRequest, userRequest } from "../api";

export function fetchAllProducts(){
  return userRequest.get(`/product`);
};

export function fetchAllTag(){
  return userRequest.get(`/tag`);
}

export function fetchTag(id: number){
  return userRequest.get(`/tag/${id}`);
}

export function fetchAllCollection(){
  return userRequest.get(`/collection`);
}

export function fetchCollection(id: number){
  return userRequest.get(`/collection/${id}`);
}