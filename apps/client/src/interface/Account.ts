import User from "./User";


export default interface Account {
  email: string;
  password: string;
  is_admin?: boolean;
  User?: User[];
}