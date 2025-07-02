import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import Image from "next/image";
import GuestLink from "./_globalComponents/GuestLink";

function HomePage() {
  return (
    <div className="w-screen h-screen grid md:grid-cols-2 md:gap-x-[2vw]">
      <div className="hidden md:grid items-center justify-items-end">
        <figure className="relative w-[400px] h-[569px]">
          <Image
            src="/Hero.webp"
            fill
            alt="Hero image"
            className="rounded-lg object-cover"
            priority
            sizes="400px"
          />
        </figure>
      </div>

      <div className="w-full md:h-full grid justify-items-center md:justify-items-start items-center py-2 md:py-0">
        {/* 👇 Loading placeholder while Clerk loads */}
        <ClerkLoading>
          <div
            className="w-full max-w-[400px] h-[590.16px] rounded-lg bg-base-content/50 animate-pulse 
              flex items-center justify-center
            "
          >
            <span
              className="text-base-100 text-2xl text-center font-bold"
              style={{ WebkitTextStroke: "1px black" }}
            >
              Loading sign-in form...
            </span>
          </div>
        </ClerkLoading>

        {/* 👇 Actual Clerk sign-in component */}
        <ClerkLoaded>
          <SignIn
            routing="hash"
            appearance={{
              baseTheme: shadesOfPurple,
              layout: {
                animations: true,
                socialButtonsVariant: "blockButton",
                socialButtonsPlacement: "bottom",
              },
            }}
          />
        </ClerkLoaded>
      </div>

      <GuestLink />
    </div>
  );
}

export default HomePage;
