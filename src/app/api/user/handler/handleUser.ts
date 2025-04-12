import { currentUser } from "@clerk/nextjs/server";

export async function handleUser() {
  console.log("handleUser()...");

  const user = await currentUser();

  const response = await fetch(`${process.env.SITE_URL}/api/user`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "request-secret": process.env.REQUEST_SECRET!,
    },
    cache: "force-cache",
    next: { tags: ["user"] },
  });

  if (!response.ok) {
    return { status: "fail" };
  }

  const data = response.json();
  return data;
}
