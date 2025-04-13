import { SignOutButton } from "@clerk/nextjs";
import { MoreItemType } from "../..";

function ButtonComponent({ item }: { item: MoreItemType }) {
  return (
    <li>
      {item.name === "Log out" ? (
        <SignOutButton>
          <div
            className="w-full flex gap-x-2 items-center min-w-max text-sm p-3 rounded-lg cursor-pointer transition-colors 
              hover:bg-base-300
            "
          >
            {item.icon}
            {item.name}
          </div>
        </SignOutButton>
      ) : (
        <>
          <button
            type="button"
            onClick={item.action}
            className={`w-full flex gap-x-2 items-center min-w-max text-sm p-3 rounded-lg transition-colors 
            hover:bg-base-300
            `}
          >
            {item.icon}
            {item.name}
          </button>
        </>
      )}
    </li>
  );
}
export default ButtonComponent;
