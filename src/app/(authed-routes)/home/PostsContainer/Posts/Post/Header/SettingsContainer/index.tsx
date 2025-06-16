import { useState } from "react";
import OpenSettingsModalButton from "./OpenSettingsModalButton";
import SettingsModal from "./SettingsModal";
import { useAppSelector } from "@/store/hooks";
import { PrismaPostType } from "../../../../../../../../../prisma/types/post";

function SettingsContainer({ post }: { post: PrismaPostType }) {
  const { isPostSettingsModalOpen } = useAppSelector((s) => s.modals);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <OpenSettingsModalButton setIsModalOpen={setIsModalOpen} />
      {isModalOpen && (
        <SettingsModal post={post} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
}
export default SettingsContainer;
