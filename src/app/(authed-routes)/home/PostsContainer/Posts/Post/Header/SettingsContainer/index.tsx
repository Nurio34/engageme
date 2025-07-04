import { useEffect, useRef, useState } from "react";
import OpenSettingsModalButton from "./OpenSettingsModalButton";
import SettingsModal from "./SettingsModal";
import { PrismaPostType } from "../../../../../../../../../prisma/types/post";

function SettingsContainer({ post }: { post: PrismaPostType }) {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const timeout = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (isModelOpen) setIsRender(true);
    else
      timeout.current = setTimeout(() => {
        setIsRender(false);
      }, 200);

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [isModelOpen]);

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
