import IUser from "./User";


export default interface IAccount {
  email: string;
  password: string;
  is_admin?: boolean;
  User?: IUser[];
}