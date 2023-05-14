import { IProduct } from "./Product"

export interface ITag{
    id: number
    name: string
    discount: number
    Product: IProduct[]
}