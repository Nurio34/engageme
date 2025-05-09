import ActivityIcon from "@/app/_globalComponents/Svg/MoreSvgs/ActivityIcon";
import Link from "next/link";

function YourActivity() {
  return (
    <Link
      href={"/your_activity/interactions/likes"}
      className="flex gap-x-2 items-center min-w-max text-sm py-4 px-3 rounded-lg transition-colors 
        hover:bg-base-300
      "
    >
      <ActivityIcon />
      Your Activity
    </Link>
  );
}
export default YourActivity;
