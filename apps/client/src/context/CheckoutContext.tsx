import { createContext, ReactNode, useState } from "react";
import LocalStorage from "../helper/localStorage";
import IOrder from "../interface/Order";
import IReceipt from "../interface/Receipt";

export const CheckoutContext = createContext<CheckoutContextProps | null>(null);

interface CheckOutProviderProps {
  children: ReactNode;

}

interface CheckoutContextProps {
  order: IOrder | null;
  setOrder: React.Dispatch<React.SetStateAction<IOrder | null>>;
  receipt: IReceipt | null;
  setReceipt: React.Dispatch<React.SetStateAction<IReceipt | null>>;
}

export const CheckoutProvider = ({ children }: CheckOutProviderProps) => {
  const [order, setOrder] = useState<IOrder | null>(null)
  const [receipt, setReceipt] = useState<IReceipt | null>(null)
  return (
    <CheckoutContext.Provider
      value={{
        order,
        setOrder,
        receipt,
        setReceipt
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};