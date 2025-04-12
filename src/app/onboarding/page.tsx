import { redirect } from "next/navigation";
import { handleUser } from "../api/user/handler/handleUser";

async function Onboarding() {
  const { status } = await handleUser();

  if (status === "fail") {
    redirect("/error");
  } else {
    redirect("/home");
  }
}
export default Onboarding;
