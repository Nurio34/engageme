import { currentUser } from "@clerk/nextjs/server";
import ProviderComponent from "./Provider";

async function StoreUser() {
  const user = await currentUser();

  if (!user) return;

  const { username, imageUrl } = user;

  return <ProviderComponent username={username} imageUrl={imageUrl} />;
}
export default StoreUser;
