import { useEffect, useRef, useState } from "react";
import OpenSettingsModalButton from "./OpenSettingsModalButton";
import SettingsModal from "./SettingsModal";
import { PrismaPostType } from "../../../../../../../../../prisma/types/post";
import { useAppSelector } from "@/store/hooks";

function SettingsContainer({ post }: { post: PrismaPostType }) {
  const { isPostSettingsModalOpen } = useAppSelector((s) => s.modals);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const timeout = useRef<NodeJS.Timeout>(null);

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
    <>
      <OpenSettingsModalButton setIsModelOpen={setIsModelOpen} />
      {isRender && (
        <SettingsModal
          isModelOpen={isModelOpen}
          setIsModelOpen={setIsModelOpen}
          post={post}
        />
      )}
    </>
  );
}
export default SettingsContainer;
