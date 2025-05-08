import { useEffect, useState } from "react";

type TypeType = "translateY" | "translateX" | "scale" | "scaleY" | "scaleX";

export const useAnimatedMount = (condition: boolean, type: TypeType) => {
  const [isMounted, setIsMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (type === "translateY")
      setStyle({
        transform: showModal ? "translateY(0%)" : "translateY(50%)",
        opacity: showModal ? 1 : 0,
      });
    else if (type === "translateX")
      setStyle({
        transform: showModal ? "translateX(0%)" : "translateX(50%)",
        opacity: showModal ? 1 : 0,
      });
    else if (type === "scale") {
      setStyle({
        transformOrigin: "top",
        transform: showModal ? "scale(1)" : "scale(0)",
        opacity: showModal ? 1 : 0,
      });
    } else if (type === "scaleY")
      setStyle({
        transformOrigin: "top",
        transform: showModal ? "scaleY(1)" : "scaleY(0)",
        opacity: showModal ? 1 : 0,
      });
    else if (type === "scaleX")
      setStyle({
        transformOrigin: "left",
        transform: showModal ? "scaleX(1)" : "scaleX(0)",
        opacity: showModal ? 1 : 0,
      });
  }, [type, showModal]);

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
