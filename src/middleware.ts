import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { NextResponse } from "next/server";

//! *** Route Protection Configs ***
const protectedRoutes = createRouteMatcher(["/home", "/onboarding"]);
const unprotectedRoutes = ["/", "/sign-in(.*)", "/sign-up(.*)"];
//! *********************************

//! *** Rate Limit Configs ***
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(1000, "3600s"),
  analytics: true,
});
//! ******************************

export default clerkMiddleware(async (auth, req) => {
  //! *** Protect "protectedRoutes" ***
  if (protectedRoutes(req)) {
    await auth.protect();
  }
  //! ********************

  const { userId } = await auth();
  const pathname = req.nextUrl.pathname;

  //! *** Rate Limiter ***
  const { success, reset, remaining } = await limiter.limit(userId!);
  console.log(success);

  if (!success) {
    return new NextResponse(
      JSON.stringify({ error: "Too many requests", reset }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Remaining": String(remaining),
          "X-RateLimit-Reset": String(reset),
        },
      }
    );
  }
  //! ********************

  //! *** When client "authenticated", prevent client to navigate to "unprotectedRoutes" ***
  if (userId && unprotectedRoutes.includes(pathname)) {
    const redirectUrl = new URL("/onboarding", req.nextUrl.origin);
    return Response.redirect(redirectUrl, 302);
  }
  //! ***************************************
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
