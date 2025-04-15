import { useEffect, useState } from "react";

export const useAnimatedMount = (condition: boolean, type?: string) => {
  const [isMounted, setIsMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const style = {
    transform: showModal ? "translateY(0%)" : "translateY(50%)",
    opacity: showModal ? 1 : 0,
  };

  useEffect(() => {
    if (condition) {
      setIsMounted(true);
      setTimeout(() => setShowModal(true), 100);
    } else {
      setShowModal(false);
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [condition]);

  return { isMounted, style };
};
