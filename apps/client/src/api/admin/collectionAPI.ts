import { http } from "..";
import ICollection from "../../interface/Collection";

export function deleteCollection({id} : ICollection) {
  return http.delete(`/collection/${id}`)
}

export function updateCollection({ id, name, discountID }: ICollection) {
  return http.patch(`/collection/${id}`, {
    name,
    discount: discountID ? {
      connect: {
        id: discountID
      }
    } : undefined,
  })
}

export function createCollection({ name, discountID }: ICollection) {
  return http.post(`/collection`, { name, discountID });
}