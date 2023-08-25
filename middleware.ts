import { NextResponse, userAgent } from "next/server";
import { NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  const { isBot } = userAgent(request);

  if (isBot) return new NextResponse("plz no bot", { status: 403 });

  if (
    request.nextUrl.pathname.startsWith("/log-in") ||
    request.nextUrl.pathname.startsWith("/sign-up")
  ) {
    if (request.cookies.has("carrotsession"))
      //로그인 되어 있는 상태에서 로그인이나 회원가입 페이지에 접근하려고 하면 홈 페이지로 redirect
      return NextResponse.redirect(new URL("/", request.url));
  } else {
    if (!request.cookies.has("carrotsession"))
      // 로그인 되어 있지 않은 상태에서 일반적인 페이지에 접근하려고 하면 로그인 페이지로 redirect
      return NextResponse.redirect(new URL("/log-in", request.url));
  }
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
