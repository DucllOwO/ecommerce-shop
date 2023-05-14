import { IUser } from "./User";

export interface IOrder {
    id: number,
    date: Date,
    total_cost: number,
    status: string,
    buyer: IUser
  }