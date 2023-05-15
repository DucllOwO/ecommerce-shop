import { createContext, ReactNode, useEffect, useState } from "react";
import LocalStorage from "../helper/localStorage";
import User from "../interface/User";

export const AppContext = createContext<AppContextProps | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User>(LocalStorage.getItem("user"));

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