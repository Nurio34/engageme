"use client";

import { useAppSelector } from "@/store/hooks";
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
  containerWidth: number | undefined;
  setContainerWidth: Dispatch<SetStateAction<number | undefined>>;
  mediaIndex: number;
  setMediaIndex: Dispatch<SetStateAction<number>>;
  isMuted: boolean;
  setIsMuted: Dispatch<SetStateAction<boolean>>;
  UlRef: RefObject<HTMLUListElement | null>;
}

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const { device } = useAppSelector((s) => s.modals);

  const [containerWidth, setContainerWidth] = useState<undefined | number>(
    undefined
  );

  const [mediaIndex, setMediaIndex] = useState(0);

  const UlRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!UlRef.current || !containerWidth) return;
    UlRef.current.style.translate = `${containerWidth * mediaIndex * -1}px`;
  }, [mediaIndex, containerWidth, device]);

  const [isMuted, setIsMuted] = useState(true);

  return (
    <Context.Provider
      value={{
        containerWidth,
        setContainerWidth,
        mediaIndex,
        setMediaIndex,
        isMuted,
        setIsMuted,
        UlRef,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("usePostContext must be used within a Provider");
  return context;
};
