import { http } from "..";

export function fetchUnpaidReceipt() {
    return http.get('/receipt/unpaid')
}

export function fetchPaidReceipt() {
    return http.get('/receipt/paid')
}