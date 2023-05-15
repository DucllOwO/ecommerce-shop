import IUser from "./User";

export interface IFeedback {
  id: number;
  content?: string;
  rate: number;
  author?: IUser;
  authorID?: string;
}