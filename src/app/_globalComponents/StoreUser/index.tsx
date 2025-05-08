import { currentUser } from "@clerk/nextjs/server";
import ProviderComponent from "./Provider";
import { redirect } from "next/navigation";

async function StoreUser() {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const { id, username, imageUrl } = user;

  return <ProviderComponent id={id} username={username} imageUrl={imageUrl} />;
}
export default StoreUser;
