import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  console.log("global");

  if (request.nextUrl.pathname.startsWith("/chats")) {
    console.log("chat page");
  }

  if (
    !(
      request.nextUrl.pathname.startsWith("/sign-up") ||
      request.nextUrl.pathname.startsWith("/log-in")
    )
  ) {
  }
};
