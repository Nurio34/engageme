"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ContextType {
  count: number;
  setcount: Dispatch<SetStateAction<number>>;
}

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [count, setcount] = useState<number>(0);

  return (
    <Context.Provider
      value={{
        count,
        setcount,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useEditContext = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("useCountContext must be used within a Provider");
  return context;
};
