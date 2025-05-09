import { useAppSelector } from "@/store/hooks";
import { JSX } from "react";
import UnmountHandler from "./UnmountHandler";
import { useAnimatedMount } from "@/hooks/useAnimatedMount";
import Settings from "./MoreItems/Settings";
import YourActivity from "./MoreItems/YourActivity";
import Saved from "./MoreItems/Saved";
import SwitchAppearance from "./MoreItems/SwitchAppearance";
import ReportProblem from "./MoreItems/ReportProblem";
import SwitchAccounts from "./MoreItems/SwitchAccounts";
import LogOut from "./MoreItems/LogOut";

export type MoreItemType = {
  name: string;
  component: JSX.Element;
};

function MoreContainer() {
  const moreItems: MoreItemType[] = [
    {
      name: "Settings",
      component: <Settings />,
    },
    {
      name: "Your activity",
      component: <YourActivity />,
    },
    {
      name: "Saved",
      component: <Saved />,
    },
    {
      name: "Switch appearance",
      component: <SwitchAppearance />,
    },
    {
      name: "Report a problem",
      component: <ReportProblem />,
    },
    {
      name: "Switch accounts",
      component: <SwitchAccounts />,
    },
    {
      name: "Log out",
      component: <LogOut />,
    },
  ];

  const { isMoreModalOpen } = useAppSelector((s) => s.modals);

  const { isMounted, style } = useAnimatedMount(isMoreModalOpen, "translateY");

  return (
    <>
      {isMounted && (
        <ul
          className={`absolute z-20 w-[266px] bottom-16 py-4 bg-base-100 text-base-content shadow-[0px_2px_10px_-2px] rounded-lg transition-all duration-[400ms]`}
          style={{ ...style }}
        >
          {moreItems.map((item) => (
            <li key={item.name}>
              <div className="px-4">{item.component}</div>
              {item.name === "Report a problem" && (
                <hr className="my-2 border-2" />
              )}
              {item.name === "Switch accounts" && <hr className="my-2" />}
            </li>
          ))}
        </ul>
      )}
      {isMoreModalOpen && <UnmountHandler />}
    </>
  );
}
export default MoreContainer;
