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
  return response.data;
};

export const resetPassword = (email: string) => {
  return http.patch(`/accounts/password-reset/${email}`);
}

export const updatePassword = (email: string, password: string) => {
  return http.patch(`/accounts/${email}`, { password });
}

export const getAccount = (email: string) => {
  return http.get(`/accounts/${email}`)
}