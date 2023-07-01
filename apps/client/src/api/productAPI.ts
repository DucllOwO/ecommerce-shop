import { http } from './index';

export function fetchTopTenBestSellers() {
  return http.get(`/product/best-sellers`);
}

export function fetchTopTenMostViewed() {
  return http.get(`/product/most-viewed`);
}

export function searchProductByName(name: string) {
  return http.get(`/product/search?name=${name}`);
}

export function getAllColorsVariant() {
  return http.get('/product-item/all-colors');
}