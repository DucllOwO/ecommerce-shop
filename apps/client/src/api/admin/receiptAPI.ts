import { http } from "..";

export function fetchUnpaidReceipt() {
    return http.get('/receipt/unpaid')
}

export function fetchPaidReceipt() {
    return http.get('/receipt/paid')
}

export function paidReceipt(id: number){
    return http.patch(`/receipt/${id}`, {status: '1'});
};