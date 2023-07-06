import { IImportDetail } from "./ImportDetail";

export interface IImporting{
    id: number;
    date: Date;
    total_cost: number;
    total_amount: number;
    ImportDetail: IImportDetail[] 
}