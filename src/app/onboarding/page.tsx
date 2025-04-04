import { redirect } from "next/navigation";
import { handleUser } from "../api/user/handleUser";

async function Onboarding() {
  const { status } = await handleUser();

  if (status === "fail") {
    redirect("/error");
  } else {
    redirect("/home");
  }
}
export default Onboarding;
