import Link from "next/link";
import { MoreItemType } from "../..";

function LinkComponent({ item }: { item: MoreItemType }) {
  return (
    <li>
      <Link
        href={item.href!}
        className="flex gap-x-2 items-center min-w-max text-sm p-3 rounded-lg transition-colors 
          hover:bg-base-300
        "
      >
        {item.icon}
        {item.name}
      </Link>
    </li>
  );
}
export default LinkComponent;
