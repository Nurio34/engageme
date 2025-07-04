import { useAppDispatch } from "@/store/hooks";
import {
  handleMouseEnter,
  handleMouseLeave,
} from "@/app/(authed-routes)/_globalComponents/UserModal/_utils/hover";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

function Name({
  name,
  setIsContainerHovered,
}: {
  name: string;
  setIsContainerHovered: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();

  // const handleMouseEnter = (e: MouseEvent) => {
  //   if (userModalTimeoutRef.current) clearTimeout(userModalTimeoutRef.current);

  //   const top = e.currentTarget.getBoundingClientRect().top;
  //   const scrollTop = window.scrollY;
  //   const height = e.currentTarget.getBoundingClientRect().height;
  //   const margin = 4;
  //   const userModalTop = top + scrollTop + height + margin;
  //   const left = e.currentTarget.getBoundingClientRect().left;
  //   dispatch(setIsHovered(true));
  //   dispatch(setPosition({ top: userModalTop, left }));
  // };

  // const handleMouseLeave = () => {
  //   if (userModalTimeoutRef.current) clearTimeout(userModalTimeoutRef.current);
  //   userModalTimeoutRef.current = setTimeout(() => {
  //     dispatch(setIsHovered(false));
  //   }, 300);
  // };

  return (
    <Link
      href={`/${name}`}
      className="font-semibold cursor-pointer max-w-min"
      onMouseEnter={(e) => {
        handleMouseEnter(e, dispatch);
        setIsContainerHovered(true);
      }}
      onMouseLeave={() => {
        handleMouseLeave(dispatch);
        setIsContainerHovered(false);
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {name}
    </Link>
  );
}
export default Name;
