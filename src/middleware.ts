import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";

const protectedRoutes = createRouteMatcher(["/home"]);
const unprotectedRoutes = ["/", "/sign-in(.*)", "/sign-up(.*)"];

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;
  const { userId, sessionClaims } = await auth();

  //! *** Protect "protectedRoutes" ***
  if (protectedRoutes(req)) {
    await auth.protect();
  }
  //! ********************

  //! *** When client "authenticated", prevent client to navigate to "unprotectedRoutes" ***
  if (userId && unprotectedRoutes.includes(pathname)) {
    const redirectUrl = new URL("/home", req.nextUrl.origin);
    return Response.redirect(redirectUrl, 302);
  }
  //! ***************************************

  const role = sessionClaims?.metadata.role;

  //! *** When login or signup, Give client "user" role ***
  if (userId && !role) {
    try {
      const clerk = await clerkClient();

      await clerk.users.updateUser(userId, {
        publicMetadata: {
          ...sessionClaims?.metadata,
          role: "user",
        },
      });
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  }
  //! **************************************************
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
