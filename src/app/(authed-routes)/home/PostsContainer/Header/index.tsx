import Link from "next/link";

function Header() {
  return (
    <header className="w-full border-b h-11 flex items-center gap-x-2">
      <Link className="font-bold text-base-content/50" href={"/home"}>
        For you
      </Link>
      <Link
        className="font-bold text-base-content/50"
        href={"/home?variant=followings"}
      >
        Following
      </Link>
    </header>
  );
}
export default Header;
