import { useRecomendationsContext } from "./Context";
import Header from "./Header";
import PreviousButton from "./PreviousButton";
import NextButton from "./NextButton";
import Recomendations from "./Recomendations";
import { useEffect, useState } from "react";

function Client() {
  const { maxWidth, recomendations, DivRef, setIndex, isLast, index } =
    useRecomendationsContext();

  const [touchEvent, setTouchEvent] = useState({
    startX: 0,
    endX: 0,
    isDraging: false,
  });
  const { endX, isDraging, startX } = touchEvent;
  useEffect(() => {
    if (isDraging) return;
    if (endX < startX) setIndex((prev) => (isLast !== index ? prev + 1 : prev));
    if (endX > startX) setIndex((prev) => (index > 0 ? prev - 1 : prev));
  }, [isDraging]);

  return (
    <div ref={DivRef} className="w-screen" style={{ maxWidth }}>
      <Header />
      <div
        className="overflow-hidden relative"
        onTouchStart={(e) => {
          const x = e.touches[0].clientX;
          setTouchEvent({ startX: x, endX: x, isDraging: true });
        }}
        onTouchMove={(e) => {
          const x = e.touches[0].clientX;
          setTouchEvent((prev) => ({ ...prev, endX: x }));
        }}
        onTouchEnd={() =>
          setTouchEvent((prev) => ({ ...prev, isDraging: false }))
        }
      >
        <PreviousButton />
        <Recomendations recomendations={recomendations} />
        <NextButton />
      </div>
    </div>
  );
}
export default Client;
