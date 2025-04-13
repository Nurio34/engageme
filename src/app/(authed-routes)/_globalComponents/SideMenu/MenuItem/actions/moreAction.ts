import { AppDispatch } from "@/store";
import { toggleMoreModal } from "@/store/slices/modals";

export const moreAction = (dispatch: AppDispatch) =>
  dispatch(toggleMoreModal());
