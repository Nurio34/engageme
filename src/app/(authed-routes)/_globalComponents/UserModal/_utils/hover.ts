import { AppDispatch } from "@/store";
import { setIsHovered, setPosition } from "@/store/slices/userModal";
import { MouseEvent } from "react";
import { InsideOfType } from "../../SuggestedForYouList";

export const handleMouseEnter = (
  e: MouseEvent<HTMLParagraphElement | HTMLElement, globalThis.MouseEvent>,
  dispatch: AppDispatch,
  insideOf?: InsideOfType,
  containerElement?: HTMLDivElement | HTMLUListElement | null
) => {
  const top =
    insideOf === "suggestedForYouModal" || insideOf === "infoContainer"
      ? e.currentTarget.offsetTop
      : e.currentTarget.getBoundingClientRect().top;

  const scrollTop =
    insideOf === "notifications" ||
    insideOf === "suggestedForYouModal" ||
    insideOf === "infoContainer" ||
    insideOf === "mobileNotifications"
      ? 0
      : window.scrollY;
  const height = e.currentTarget.getBoundingClientRect().height;
  const margin =
    -1 -
    (insideOf === "suggestedForYouModal"
      ? containerElement
        ? containerElement.scrollTop
        : 0
      : insideOf === "mobileNotifications"
      ? containerElement
        ? containerElement.scrollTop * -1 + 49
        : 49
      : insideOf === "infoContainer"
      ? containerElement
        ? containerElement.scrollTop
        : 0
      : insideOf === "notifications"
      ? containerElement
        ? containerElement.scrollTop * -1
        : 0
      : 0);
  const userModalTop = top + scrollTop + height + margin;

  const left = e.currentTarget.offsetLeft;

  dispatch(setIsHovered(true));
  dispatch(setPosition({ top: userModalTop, left }));
};

export const handleMouseLeave = (dispatch: AppDispatch) =>
  dispatch(setIsHovered(false));
