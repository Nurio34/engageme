import { SignOutButton } from "@clerk/nextjs";

function LogOut() {
  return (
    <SignOutButton>
      <div
        className="w-full flex gap-x-2 items-center min-w-max text-sm py-4 px-3 rounded-lg cursor-pointer transition-colors 
      hover:bg-base-300
    "
      >
        Log out
      </div>
    </SignOutButton>
  );
}
export default LogOut;
