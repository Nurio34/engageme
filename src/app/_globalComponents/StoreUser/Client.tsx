import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/user";
import { useEffect } from "react";

function Client({
  id,
  username,
  imageUrl,
  fullname,
}: {
  id: string;
  username: string | null;
  imageUrl: string;
  fullname: string;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setUser({
        id,
        username: username || "user",
        avatar: imageUrl,
        fullname: fullname || username || "user",
      })
    );
  }, [dispatch, username, imageUrl, id, fullname]);

  return <div />;
}
export default Client;
