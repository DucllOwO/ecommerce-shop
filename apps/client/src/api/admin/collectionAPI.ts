import { http } from "..";
import ICollection from "../../interface/Collection";

export function updateCollection({ id, name, discountID }: ICollection) {
    return http.patch(`/collection/${id}`, {
      name,
      discount: {
        connect: {
          id: discountID
        }
      },
    })
  }