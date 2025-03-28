import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { handleUser } from "./apiCalls/handleUser";
// import { handleUser } from "./actions/handleUser";

async function HomePage() {
  const { status, user } = await handleUser();

  if (status === "fail") {
    redirect("/error");
  }

  return (
    <div>
      <h1> {user.name}</h1>
      <img src={user.avatar!} alt={user.name!} width={50} height={50} />
      <p> {user.email}</p>
    </div>
  );
}

export default HomePage;
