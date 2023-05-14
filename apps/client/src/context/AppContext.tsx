import { createContext, ReactNode, useState } from "react";
import LocalStorage from "../helper/localStorage";

export const AppContext = createContext({});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState(LocalStorage.getItem("user"));

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