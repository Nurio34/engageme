import SavedIcon from "@/app/_globalComponents/Svg/MoreSvgs/SavedIcon";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";

function Saved() {
  const { username } = useAppSelector((s) => s.user);

  return (
    <Link
      href={`/${username}/saved`}
      className="flex gap-x-2 items-center min-w-max text-sm py-4 px-3 rounded-lg transition-colors 
        hover:bg-base-300
      "
    >
      <SavedIcon />
      Saved
    </Link>
  );
}
export default Saved;
