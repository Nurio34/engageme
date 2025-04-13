import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/user";
import { User } from "@clerk/nextjs/server";
import { useEffect } from "react";

function Client({
  username,
  imageUrl,
}: {
  username: string | null;
  imageUrl: string;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUser({ username: username || "user", avatar: imageUrl }));
  }, [username, imageUrl]);

  return <div />;
}
export default Client;
