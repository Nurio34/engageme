import SettingsIcon from "@/app/_globalComponents/Svg/MoreSvgs/SettingsIcon";
import Link from "next/link";

function Settings() {
  return (
    <Link
      href={"/accounts/edit"}
      className="flex gap-x-2 items-center min-w-max text-sm py-4 px-3 rounded-lg transition-colors 
          hover:bg-base-300
        "
    >
      <SettingsIcon />
      Settings
    </Link>
  );
}
export default Settings;
