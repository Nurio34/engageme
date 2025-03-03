import { AppDispatch } from "@/store";
import { toggleCreateModal } from "@/store/slices/modals";

export const createAction = (dispatch: AppDispatch) => {
  dispatch(toggleCreateModal());
};
