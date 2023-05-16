import IAccount from '../interface/Account';
import IUser from '../interface/User';
import { http } from './index';

export const createAccount = async (email: string, password: string, user: IUser) => {
  console.log(user)
  const response = await http.post('/accounts', {
    email, password,
    User: {
      create: {
        ...user
      }
    }
  });
  console.log(response)
  return response.data;
};