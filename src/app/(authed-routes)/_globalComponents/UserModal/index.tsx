import { useEffect, useState } from "react";
import { getUserModalInfo } from "./_actions/getUserModalInfo";
import { UserModalType } from "../../../../../prisma/types/userModal";

function UserModal({ userId }: { userId: string }) {
  const [userInfo, setUserInfo] = useState({} as UserModalType);
  console.log(userInfo);

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

  return <div className="absolute z-10">UserModal</div>;
}
export default UserModal;
