import { MoreItemType } from "..";
import ButtonComponent from "./ButtonComponent";
import LinkComponent from "./LinkComponent";

function MoreItem({ item }: { item: MoreItemType }) {
  return (
    <>
      <div className="px-4">
        {item.type === "link" ? (
          <LinkComponent item={item} />
        ) : (
          <ButtonComponent item={item} />
        )}
      </div>
      {item.name === "Report a problem" && <hr className="my-2 border-2" />}
      {item.name === "Switch accounts" && <hr className="my-2" />}
    </>
  );
}
export default MoreItem;
