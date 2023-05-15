import User from "./User";

export interface Feedback {
  id: number;
  content?: string;
  rate: number;
  author?: User;
  authorID?: string;
}