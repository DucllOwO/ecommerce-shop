import { IImportDetail } from "./ImportDetail";

export interface IImporting{
    id: number;
    date: Date;
    ImportDetail: IImportDetail[] 
}