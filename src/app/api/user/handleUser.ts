import { currentUser } from "@clerk/nextjs/server";

export async function handleUser() {
  const user = await currentUser();

  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/user`, {
    method: "POST",
    body: JSON.stringify(user),
    next: { tags: ["user"] },
  });

  if (!response.ok) {
    return { status: "fail" };
  }

  const data = response.json();
  return data;
}
