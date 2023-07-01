import { http } from "..";

export function getAllImport(){
    return http.get(`/import`);
}

export function createImport(newImport: any){
    return http.post(`/import`, newImport)
}