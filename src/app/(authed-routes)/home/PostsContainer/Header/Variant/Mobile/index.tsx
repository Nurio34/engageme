import Chevron from "@/app/_globalComponents/Svg/Chevron";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
function Mobile({ variant }: { variant: string | undefined }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isModalOpen) {
      setIsRender(true);
      timeout.current = setTimeout(() => {
        setIsVisible(true);
      }, 1000 / 30);
    } else {
      setIsVisible(false);
      timeout.current = setTimeout(() => {
        setIsRender(false);
      }, 400);
    }

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [isModalOpen]);

  const isForYou = !variant || variant === "home";

  return (
    <div>
      <button
        type="button"
        className="capitalize flex items-center gap-x-2 text-2xl font-bold"
        onClick={() => setIsModalOpen((pre) => !pre)}
      >
        {!variant || variant === "home" ? "For You" : variant}
        <Chevron rotate={isModalOpen ? 0 : 180} />
      </button>
      {isRender && (
        <ul
          className={`absolute z-10 border space-y-1 bg-base-100 shadow-md rounded-md transition-all duration-[400ms] ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-9 opacity-0"
          }`}
        >
          {!isForYou && (
            <li>
              <Link
                href={"/home?variant=home"}
                prefetch
                onClick={() => setIsModalOpen(false)}
                className="flex justify-between gap-x-4 items-center py-2 px-4 border"
              >
                For You
                <FaPeopleGroup className="text-[22px] " />
              </Link>
            </li>
          )}
          {variant !== "followings" && (
            <li>
              <Link
                href={"/home?variant=followings"}
                prefetch
                onClick={() => setIsModalOpen(false)}
                className={`flex justify-between gap-x-4 items-center py-2 px-4
                  ${isForYou ? "border" : ""}  
                `}
              >
                Followings
                <GoPeople className="text-[22px]" />
              </Link>
            </li>
          )}
          {variant !== "favorites" && (
            <li>
              <Link
                href={"/home?variant=favorites"}
                prefetch
                onClick={() => setIsModalOpen(false)}
                className="flex justify-between gap-x-4 items-center py-2 px-4"
              >
                Favorites
                <FaRegStar className="text-[22px]" />
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
export default Mobile;
