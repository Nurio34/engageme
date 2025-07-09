import { useEffect, useRef, useState } from "react";
import OpenSettingsModalButton from "./OpenSettingsModalButton";
import SettingsModal from "./SettingsModal";
import { PrismaPostType } from "../../../../../../../../../prisma/types/post";
import { useAppSelector } from "@/store/hooks";
import FavoritedIcon from "@/app/_globalComponents/Svg/FavoritedIcon";

function SettingsContainer({ post }: { post: PrismaPostType }) {
  const { favoritesReceived } = post.user;

  const { id } = useAppSelector((s) => s.user);

  const { isPostSettingsModalOpen } = useAppSelector((s) => s.modals);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const timeout = useRef<NodeJS.Timeout>(null);

  const isUserFavorite = favoritesReceived.some((f) => f.userId === id);

  useEffect(() => {
    if (isModelOpen && isPostSettingsModalOpen) setIsRender(true);
    else
      timeout.current = setTimeout(() => {
        setIsRender(false);
      }, 200);

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [isModelOpen, isPostSettingsModalOpen]);

  return (
    <div
      className="h-full col-start-3 col-end-4 justify-self-end ml-auto
      flex items-center gap-x-4
    "
    >
      {isUserFavorite && <FavoritedIcon />}
      <OpenSettingsModalButton setIsModelOpen={setIsModelOpen} />
      {isRender && (
        <SettingsModal
          isModelOpen={isModelOpen}
          setIsModelOpen={setIsModelOpen}
          post={post}
        />
      )}
    </div>
  );
}
export default SettingsContainer;
