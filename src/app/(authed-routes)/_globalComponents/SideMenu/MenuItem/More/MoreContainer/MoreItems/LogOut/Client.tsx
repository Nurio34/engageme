import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleMoreModal } from "@/store/slices/modals";
import { SignIn, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

function Client() {
  const { id } = useAppSelector((s) => s.user);
  const dispatch = useAppDispatch();

  return id ? (
    <SignOutButton signOutOptions={{ redirectUrl: "/home" }}>
      <div
        className="w-full flex gap-x-2 items-center min-w-max text-sm py-4 px-3 rounded-lg cursor-pointer transition-colors 
            hover:bg-base-300
        "
      >
        Log out
      </div>
    </SignOutButton>
  ) : (
    <Link
      href={"/sign-in"}
      className="w-full flex gap-x-2 items-center min-w-max text-sm py-4 px-3 rounded-lg cursor-pointer transition-colors 
            hover:bg-base-300
        "
      prefetch
      onClick={() => dispatch(toggleMoreModal())}
    >
      Sign in
    </Link>
  );
}
export default Client;
