import { useCreateModalContext } from "@/app/(authed-routes)/_globalComponents/CreateModal/Context";
import ChecboxToggle from "@/app/_globalComponents/CheckboxToggle";
import Link from "next/link";
import { useEffect, useState } from "react";

function CountsSettings() {
  const { setSettings, settings } = useCreateModalContext();

  const [isChecked, setIsChecked] = useState<boolean | undefined>(
    settings.isCountsVisible
  );

  useEffect(() => {
    setSettings((prev) => ({ ...prev, isCountsVisible: isChecked! }));
  }, [setSettings, isChecked]);

  return (
    <div className="py-2">
      <div className="flex items-center justify-between">
        <p>Hide like and view counts on this post</p>
        <ChecboxToggle isChecked={isChecked} setIsChecked={setIsChecked} />
      </div>
      <p className=" text-xs text-base-content/70 py-1">
        Only you will see the total number of likes and views on this post. You
        can change this later by going to the ··· menu at the top of the post.
        To hide like counts on other people&apos;s posts, go to your account
        settings.
      </p>
      <Link href={"#"} className="text-xs text-[#00376B] font-semibold">
        Learn More
      </Link>
    </div>
  );
}
export default CountsSettings;
