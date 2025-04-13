import { useEffect, useState } from "react";

export const animatedMount = (condition: boolean) => {
  const [isMounted, setIsMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const style = showModal
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-10";

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
