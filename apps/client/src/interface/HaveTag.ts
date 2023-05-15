import IProduct from "./Product";
import ITag from "./Tag";



export interface IHaveTag {
    id: number;
    tag: ITag;
    tagID: Number;
    product: IProduct; 
    productID: number;
}