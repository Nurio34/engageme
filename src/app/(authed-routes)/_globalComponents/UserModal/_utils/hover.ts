import { AppDispatch } from "@/store";
import {
  clearUserModalTimeout,
  setIsHovered,
  setPosition,
  setUserModalTimeout,
} from "@/store/slices/userModal";
import { MouseEvent } from "react";
import { InsideOfType } from "../../SuggestedForYouList";

export const handleMouseEnter = (
  e: MouseEvent<HTMLParagraphElement | HTMLElement, globalThis.MouseEvent>,
  dispatch: AppDispatch,
  insideOf?: InsideOfType,
  containerElement?: HTMLDivElement | HTMLUListElement | null
) => {
  const modalSize = 366;

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

  let userModalTop = top + scrollTop + height + margin;
  const excessedBottom =
    userModalTop -
    scrollTop +
    modalSize -
    ((insideOf === "infoContainer" || insideOf === "suggestedForYouModal") &&
    containerElement
      ? containerElement.getBoundingClientRect().bottom
      : innerHeight);
  if (excessedBottom > 0) {
    userModalTop =
      userModalTop - excessedBottom - (insideOf === "infoContainer" ? 42 : 16);
  }

  let left = e.currentTarget.offsetLeft;
  const excessedRight =
    left +
    modalSize -
    ((insideOf === "infoContainer" || insideOf === "suggestedForYouModal") &&
    containerElement
      ? containerElement.getBoundingClientRect().width
      : innerWidth);
  if (excessedRight > 0) {
    left = left - excessedRight - 16;
  }

  dispatch(clearUserModalTimeout());
  const timeout = setTimeout(() => {
    dispatch(setIsHovered(true));
  }, 400);
  dispatch(setUserModalTimeout(timeout));
  dispatch(setPosition({ top: userModalTop, left }));
};

export const handleMouseLeave = (dispatch: AppDispatch) => {
  dispatch(setIsHovered(false));
  dispatch(clearUserModalTimeout());
};
