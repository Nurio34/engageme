import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getUserModalInfo } from "./_actions/getUserModalInfo";
import { UserModalType } from "../../../../../prisma/types/userModal";
import { useAppSelector } from "@/store/hooks";
import UserInfo from "./_components/UserInfo";

function UserModal({
  userId,
  isContainerHovered,
  setIsContainerHovered,
}: {
  userId: string;
  isContainerHovered: boolean;
  setIsContainerHovered: Dispatch<SetStateAction<boolean>>;
}) {
  const { position } = useAppSelector((s) => s.userModal);
  const { top, left } = position;

  const [userInfo, setUserInfo] = useState({} as UserModalType);
  const { avatar, name, fullname } = userInfo;

  useEffect(() => {
    if (!userId) return;

    const getUserModalInfosAction = async () => {
      try {
        const { status, userInfo } = await getUserModalInfo(userId);
        if (status === "fail" || !userInfo) return;
        setUserInfo(userInfo);
      } catch (error) {
        console.log(error);
      }
    };

    getUserModalInfosAction();
  }, [userId]);

  const handleMouseEnter = () => setIsContainerHovered(true);

  const handleMouseLeave = () => setIsContainerHovered(false);

  return (
    isContainerHovered && (
      <div
        className={`absolute z-20 w-[366px] aspect-square rounded-lg bg-primary hover:bg-secondary shadow-lg py-4`}
        style={{ top, left }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <UserInfo avatar={avatar} name={name} fullname={fullname} />
      </div>
    )
  );
}
export default UserModal;
