import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("test middleware");

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
  matcher: ["/", "/paginas/landing"],
  // matcher: [
  //   /*
  //    * Match all request paths except for the ones starting with:
  //    * - api (API routes)
  //    * - static (static files)
  //    * - favicon.ico (favicon file)
  //    */
  //   "/((?!api|_next/static|_next/image|favicon.ico).*)",
  // ],
};
