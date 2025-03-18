"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { TransformationType } from "./Medias/MediaContainer/ImageContainer/EditTab/TransformationsTab";

export type GlobalTransformationType = {
  index: number;
  transformations: TransformationType[];
};

interface ContextType {
  globalTransformations: GlobalTransformationType[];
  setGlobalTransformations: Dispatch<
    SetStateAction<GlobalTransformationType[]>
  >;
}

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [globalTransformations, setGlobalTransformations] = useState<
    GlobalTransformationType[]
  >([]);

  return (
    <Context.Provider
      value={{
        globalTransformations,
        setGlobalTransformations,
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
