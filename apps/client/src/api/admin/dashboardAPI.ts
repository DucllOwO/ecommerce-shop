import { http } from "..";

export function fetchReport() {
    return http.get(`/report/yearly`);
}