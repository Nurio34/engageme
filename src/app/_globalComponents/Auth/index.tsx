"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

function Auth() {
  const { isLoaded } = useUser();

  return (
    <>
      {!isLoaded ? (
        <div className="w-7 aspect-square rounded-full bg-base-content animate-pulse" />
      ) : (
        <div className="flex justify-center items-center">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      )}
    </>
  );
}

export default Auth;
