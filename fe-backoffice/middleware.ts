import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userToken = request.cookies.get("Session")?.value;

  if (!userToken) {
    return NextResponse.redirect(
      new URL("/backoffice/user-admission", request.url)
    );
  } else {
    return NextResponse.redirect(new URL("/backoffice", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - user-admission
     */
    "/((?!api|_next/static|_next/image|favicon.ico|user-admission).*)",
  ],
};
