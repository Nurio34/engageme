import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function HomePage() {
  const clerkUser = await currentUser();
  if (!clerkUser) return redirect("/login"); // Handle missing authentication properly

  const { id: clerkId, fullName, imageUrl: avatar, emailAddresses } = clerkUser;

  let user;
  try {
    user = await prisma.user.findUnique({ where: { clerkId } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId,
          name: fullName,
          avatar,
          email: emailAddresses[0].emailAddress,
        },
      });
    }
  } catch (error) {
    console.error("Database Error:", error);
    return redirect("/error"); // Redirect to an error page instead of using inside catch
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <img src={user.avatar!} alt={user.name!} width={50} height={50} />
      <p>Email: {user.email}</p>
    </div>
  );
}

export default HomePage;
