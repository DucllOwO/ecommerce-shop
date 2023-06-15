import { http } from "..";



export function createImport(newImport: any){
    return http.post(`/importing`, newImport)
}