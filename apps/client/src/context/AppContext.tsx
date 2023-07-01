import { createContext, ReactNode, useEffect, useState } from "react";
import LocalStorage from "../helper/localStorage";
import IProduct from "../interface/Product";
import IUserLocalStorage from "../interface/UserLocalStorage";

export const AppContext = createContext<AppContextProps | null>(null);

interface AppProviderProps {
  children: ReactNode;

}

interface AppContextProps {
  user: IUserLocalStorage | null;
  setUser: React.Dispatch<React.SetStateAction<IUserLocalStorage | null>>;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<IUserLocalStorage | null>(LocalStorage.getItem("user"));

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};