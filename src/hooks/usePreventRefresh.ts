import { useEffect } from "react";

export const usePreventRefresh = (dependency: boolean) => {
  useEffect(() => {
    if (dependency) {
      document.documentElement.classList.add("PreventRefresh");
      document.body.classList.add("PreventRefresh");
    } else {
      document.documentElement.classList.remove("PreventRefresh");
      document.body.classList.remove("PreventRefresh");
    }

    return () => {
      document.documentElement.classList.remove("PreventRefresh");
      document.body.classList.remove("PreventRefresh");
    };
  }, [dependency]);
};
