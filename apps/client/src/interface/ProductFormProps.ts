import { FormInstance } from "antd";
import ICollection from "./Collection";
import IDiscount from "./Discount";
import ITag from "./Tag";

export default interface ProductFormProps {
    form: FormInstance<any>,
    tagInit: ITag[],
    collectionInit: ICollection[],
    discountInit: IDiscount[],
}