import { AppDispatch } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { toggleCreateModal } from "@/store/slices/modals";
import { UseDispatch } from "react-redux";

export const createAction = (dispatch: AppDispatch) => {
  dispatch(toggleCreateModal());
};
