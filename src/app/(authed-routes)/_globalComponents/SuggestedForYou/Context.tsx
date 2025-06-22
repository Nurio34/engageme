"use client";

import { PrismaRecomendationType } from "@/app/api/recomendation/handler/getRecomendations";
import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface ContextType {
  maxWidth: number;
  recomendations: PrismaRecomendationType[];
  DivRef: RefObject<HTMLDivElement | null>;
  divWidth: number;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  isLast: number;
}

const Context = createContext<ContextType | undefined>(undefined);

export const RecomendationsProvider = ({
  children,
  maxWidth,
  recomendations,
}: {
  children: ReactNode;
  maxWidth: number;
  recomendations: PrismaRecomendationType[];
}) => {
  const DivRef = useRef<HTMLDivElement | null>(null);
  const [divWidth, setDivWidth] = useState(0);
  const oneColumnWidth = 168 + 16; //! li width + gap-x
  const totalVisibleRecomendations = divWidth / oneColumnWidth;
  const isLast = Math.ceil(
    recomendations.length / totalVisibleRecomendations - 1
  );

  useEffect(() => {
    const handleDivWidth = () => {
      if (DivRef.current)
        setDivWidth(DivRef.current.getBoundingClientRect().width);
    };

    handleDivWidth();

    window.addEventListener("resize", handleDivWidth);

    return () => window.removeEventListener("resize", handleDivWidth);
  }, []);

  const [index, setIndex] = useState(0);

  return (
    <Context.Provider
      value={{
        maxWidth,
        recomendations,
        DivRef,
        divWidth,
        index,
        setIndex,
        isLast,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useRecomendationsContext = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("useRecomendationsContext must be used within a Provider");
  return context;
};
