import { http } from "..";

export function fetchReport() {
    return http.get(`/report/yearly`);
}

export function fetchTopTenBestSellers() {
    return http.get(`/product/best-sellers`);
}
  
export function fetchTopTenMostViewed() {
    return http.get(`/product/most-viewed`);
}