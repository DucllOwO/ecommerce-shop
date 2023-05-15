import Account from '../interface/Account';
import User from '../interface/User';
import { http } from './index';

export const createAccount = async (email: string, password: string, user: User) => {
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