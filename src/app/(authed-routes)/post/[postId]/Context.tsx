"use client";

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
  MediasRef: RefObject<HTMLLIElement[]>;
  mediaIndex: number;
  setMediaIndex: Dispatch<SetStateAction<number>>;
  isMuted: boolean;
  setIsMuted: Dispatch<SetStateAction<boolean>>;
}

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [containerWidth, setContainerWidth] = useState<undefined | number>(
    undefined
  );

  const MediasRef = useRef<HTMLLIElement[]>([]);

  const [mediaIndex, setMediaIndex] = useState(0);

  useEffect(() => {
    if (MediasRef.current.length === 0) return;

    MediasRef.current[mediaIndex].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [mediaIndex]);

  const [isMuted, setIsMuted] = useState(true);

  return (
    <Context.Provider
      value={{
        containerWidth,
        setContainerWidth,
        MediasRef,
        mediaIndex,
        setMediaIndex,
        isMuted,
        setIsMuted,
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
