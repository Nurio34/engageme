import { useState } from "react";
import OpenSettingsModalButton from "./OpenSettingsModalButton";
import SettingsModal from "./SettingsModal";
import { PrismaPostType } from "../../../../../../../../../prisma/types/post";

function SettingsContainer({ post }: { post: PrismaPostType }) {
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
