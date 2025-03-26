import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import ChecboxToggle from "@/app/_globalComponents/CheckboxToggle";
import { useEffect, useState } from "react";

function CommentsSettings() {
  const { setSettings, settings } = useCreateModalContext();

  const [isChecked, setIsChecked] = useState<boolean | undefined>(
    settings.isCountsVisible
  );

  useEffect(() => {
    setSettings((prev) => ({ ...prev, isCommentingAllowed: isChecked! }));
  }, [isChecked]);
  return (
    <div className="py-2">
      <div className="flex items-center justify-between ">
        <p>Turn off commenting</p>
        <ChecboxToggle isChecked={isChecked} setIsChecked={setIsChecked} />
      </div>
      <p className=" text-xs text-base-content/70 py-1">
        You can change this later by going to the ··· menu at the top of your
        post
      </p>
    </div>
  );
}
export default CommentsSettings;
