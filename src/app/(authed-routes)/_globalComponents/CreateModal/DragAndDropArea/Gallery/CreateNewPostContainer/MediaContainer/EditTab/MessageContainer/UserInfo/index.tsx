import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Dispatch, RefObject, SetStateAction } from "react";
import { EditTabTranslateXType } from "../../../../../EditContainer/Medias/MediaContainer/CloseSlider/useEditTabControl";
import { RxThickArrowRight } from "react-icons/rx";

function UserInfo({
  setEditTabTranslateX,
  EditTabWidth,
}: {
  setEditTabTranslateX: Dispatch<SetStateAction<EditTabTranslateXType>>;
  EditTabWidth: RefObject<number>;
}) {
  const { user } = useUser();
  if (!user) return;
  const { imageUrl, username } = user;

  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-x-2">
        <figure className="relative w-7 aspect-square rounded-full overflow-hidden">
          <Image src={imageUrl} fill alt={`Avatar of ${username}`} />
        </figure>
        <p className="font-bold text-sm">{username}</p>
      </div>
      <button
        type="button"
        className="md:hidden px-2 py-1 bg-base-content rounded-lg"
        onClick={() =>
          setEditTabTranslateX({
            old: EditTabWidth.current,
            new: EditTabWidth.current,
          })
        }
      >
        <RxThickArrowRight size={24} className="text-base-100" />
      </button>
    </div>
  );
}
export default UserInfo;
