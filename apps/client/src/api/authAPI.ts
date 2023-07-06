import { http } from ".";

export const login = (email: string, password: string) => {
  return http.post("/auth/login", {
    email,
    password,
  });
};

export const sendEmailResetPassword = (email: string) => {
  return http.post("/auth/forgot-password", {
    email,
  });
};