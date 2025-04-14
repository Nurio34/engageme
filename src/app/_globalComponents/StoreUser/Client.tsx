import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/user";
import { useEffect } from "react";

function Client({
  id,
  username,
  imageUrl,
}: {
  id: string;
  username: string | null;
  imageUrl: string;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUser({ id, username: username || "user", avatar: imageUrl }));
  }, [dispatch, username, imageUrl, id]);

  return <div />;
}
export default Client;
