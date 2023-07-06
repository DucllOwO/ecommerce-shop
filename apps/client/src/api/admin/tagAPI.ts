import { IHaveTag } from '../../interface/HaveTag';
import ITag from '../../interface/Tag';
import { http } from './../index';


export function fetchAllTag(){
  return http.get(`/tag`);
}

export function fetchTag(id: number){
  return http.get(`/tag/${id}`);
}

export function createTag({ name, discountID }: ITag) {
  return http.post(`/tag`, { name, discountID })
}

export function updateTag({ id, name, discountID }: ITag) {
  return http.patch(`/tag/${id}`, {
    name,
    discount: discountID ? {
      connect: {
        id: discountID
      }
    } : undefined,
  })
}

export function deleteTag({ id }: ITag) {
  return http.delete(`/tag/${id}`)
}

export function deleteHaveTag({ id }: IHaveTag) {
  return http.delete(`/tag/have_tag/${id}`)
}

