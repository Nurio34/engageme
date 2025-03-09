"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { TransformationType } from "./Medias/MediaContainer/EditTab/TransformationsTab";

export type GlobalTransformationType = {
  index: number;
  transformations: TransformationType[];
};

interface ContextType {
  globalTransformations: GlobalTransformationType[];
  setGlobalTransformations: React.Dispatch<
    React.SetStateAction<GlobalTransformationType[]>
  >;
}

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [globalTransformations, setGlobalTransformations] = useState<
    GlobalTransformationType[]
  >([]);

  return (
    <Context.Provider
      value={{ globalTransformations, setGlobalTransformations }}
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
