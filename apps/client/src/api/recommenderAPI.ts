import { http } from ".";

export function getSimilarProducts(id: number){
  return http.get(`/recommender/${id}`);
};