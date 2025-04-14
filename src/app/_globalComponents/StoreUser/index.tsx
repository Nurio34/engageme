import { currentUser } from "@clerk/nextjs/server";
import ProviderComponent from "./Provider";

async function StoreUser() {
  const user = await currentUser();

  if (!user) return;

  const { id, username, imageUrl } = user;

  return <ProviderComponent id={id} username={username} imageUrl={imageUrl} />;
}
export default StoreUser;
