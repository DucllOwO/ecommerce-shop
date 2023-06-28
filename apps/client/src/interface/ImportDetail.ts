import { IImporting } from "./Importing";
import IProduct_item from "./ProductItem";


export interface IImportDetail{
    id: number;
    item: number;
    quantity: number;
    price: number;
    importID: number
    total_cost: number
    import: IImporting   
    Product_item: IProduct_item
}