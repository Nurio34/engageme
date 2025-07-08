import { Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import UserInfo from "./_components/UserInfo";
import { clearUserModalTimeout, setIsHovered } from "@/store/slices/userModal";
import ActivityInfo from "./_components/ActivityInfo";
import Posts from "./_components/Posts";
import ActionButtons from "./_components/ActionButtons";
import { PrismaRecomendationType } from "../../../../../prisma/types/recomendation";

function UserModal({
  userId,
  isContainerHovered,
  setIsContainerHovered,
  recomendation,
}: {
  userId: string;
  isContainerHovered: boolean;
  setIsContainerHovered: Dispatch<SetStateAction<boolean>>;
  recomendation: PrismaRecomendationType;
}) {
  const { position, isHovered } = useAppSelector((s) => s.userModal);
  const { top, left } = position;
  const dispatch = useAppDispatch();

  const { avatar, name, fullname, _count, posts, followers } = recomendation;

  const handleMouseEnter = () => {
    dispatch(setIsHovered(true));
    setIsContainerHovered(true);
  };

  const handleMouseLeave = () => {
    dispatch(clearUserModalTimeout());
    dispatch(setIsHovered(false));
    setIsContainerHovered(false);
  };

  // if (isLoading && isContainerHovered)
  //   return (
  //     <div
  //       className={`absolute z-20 w-[366px] aspect-square rounded-lg bg-base-100 shadow-lg py-4 transition-all
  //           grid
  //           ${isHovered ? "opacity-100" : "opacity-0"}
  //         `}
  //       style={{ top, left }}
  //       onMouseEnter={handleMouseEnter}
  //       onMouseLeave={handleMouseLeave}
  //     >
  //       <div className="px-4 flex items-center gap-x-4">
  //         <figure className="relative w-16 aspect-square rounded-full overflow-hidden bg-base-content/50 animate-pulse"></figure>
  //         <div className="space-y-1">
  //           <p className=" h-4 w-20 rounded-md bg-base-content/50 animate-pulse" />
  //           <p className="h-4 w-40 rounded-md bg-base-content/50 animate-pulse" />
  //         </div>
  //       </div>
  //       <div className="flex justify-between">
  //         <div className="grow flex flex-col items-center text-sm space-y-1">
  //           <div className="font-bold leading-4 bg-base-content/50 animate-pulse text-transparent rounded-md">
  //             posts
  //           </div>
  //           <div className="bg-base-content/50 animate-pulse text-transparent rounded-md">
  //             posts
  //           </div>
  //         </div>
  //         <div className="grow text-center flex flex-col items-center text-sm space-y-1">
  //           <div className="font-bold leading-4 bg-base-content/50 animate-pulse text-transparent rounded-md">
  //             followers
  //           </div>
  //           <div className="bg-base-content/50 animate-pulse text-transparent rounded-md">
  //             followers
  //           </div>
  //         </div>
  //         <div className="grow text-center flex flex-col items-center text-sm space-y-1">
  //           <div className="font-bold leading-4 bg-base-content/50 animate-pulse text-transparent rounded-md">
  //             following
  //           </div>
  //           <div className="bg-base-content/50 animate-pulse text-transparent rounded-md">
  //             following
  //           </div>
  //         </div>
  //       </div>
  //       <div className="flex gap-x-[3px] h-[120px]">
  //         {Array(3)
  //           .fill("#")
  //           .map((_, ind) => (
  //             <div
  //               key={ind}
  //               className="aspect-square bg-base-content/50 animate-pulse"
  //             />
  //           ))}
  //       </div>
  //       <div className="flex justify-center gap-x-4 items-center px-4">
  //         <div className="btn btn-sm bg-base-content/50 grow animate-pulse" />
  //         <div className="btn btn-sm bg-base-content/50 grow animate-pulse" />
  //       </div>
  //     </div>
  //   );

  return (
    isContainerHovered && (
      <div
        className={`absolute z-20 w-[366px] aspect-square rounded-lg bg-base-100 shadow-lg py-4 transition-all duration-[400ms]
          grid 
            ${
              isHovered
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }
          `}
        style={{ top, left }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <UserInfo avatar={avatar} name={name} fullname={fullname} />
        <ActivityInfo count={_count} />
        <Posts posts={posts} />
        <ActionButtons followers={followers} userId={userId} />
      </div>
    )
  );
}
export default UserModal;
