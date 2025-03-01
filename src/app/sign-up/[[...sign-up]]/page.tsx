import { SignUp } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import Image from "next/image";

function HomePage() {
  return (
    <div className="w-screen h-screen md:grid md:grid-cols-2 md:gap-x-[2vw]">
      <div className="hidden md:grid items-center justify-items-end ">
        <figure className="relative w-[400px] h-[569px] ">
          <Image
            src={"/hero.webp"}
            fill
            alt="Hero image"
            className="rounded-lg object-cover"
            sizes="400px"
          />
        </figure>
      </div>
      <div className="w-full h-full grid justify-items-center md:justify-items-start items-center">
        <SignUp
          routing="hash"
          appearance={{
            baseTheme: shadesOfPurple,
            variables: {},
            layout: {
              animations: true,
              socialButtonsVariant: "blockButton",
              socialButtonsPlacement: "bottom",
            },
          }}
        />
      </div>{" "}
    </div>
  );
}
export default HomePage;
