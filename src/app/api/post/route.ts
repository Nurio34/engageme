import { auth } from "@clerk/nextjs/server";
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";

import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

export async function GET(req: NextRequest) {
  console.log(req);

  if (req.headers.get("request-secret") !== process.env.REQUEST_SECRET!) {
    console.log("invlalid");
  }

  limiter(req);

  try {
  } catch (error) {
    console.log(error);
  }
}
