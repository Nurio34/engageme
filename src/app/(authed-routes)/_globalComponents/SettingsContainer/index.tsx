import { useEffect, useRef, useState } from "react";
import OpenSettingsModalButton from "./OpenSettingsModalButton";
import SettingsModal from "./SettingsModal";
import { PrismaPostType } from "../../../../../../../../../prisma/types/post";
import { useAppSelector } from "@/store/hooks";

function SettingsContainer({ post }: { post: PrismaPostType }) {
  const { isPostSettingsModalOpen } = useAppSelector((s) => s.modals);

  const [isRender, setIsRender] = useState(isPostSettingsModalOpen);
  const timeout = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (isPostSettingsModalOpen) setIsRender(true);
    else
      timeout.current = setTimeout(() => {
        setIsRender(false);
      }, 200);

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [isPostSettingsModalOpen]);

  return (
    <>
      <OpenSettingsModalButton />
      {isRender && <SettingsModal post={post} />}
    </>
  );
}
export default SettingsContainer;
