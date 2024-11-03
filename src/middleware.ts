import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "./constant/env";

const middleware = (req: NextRequest) => {
  const token = req.cookies.get("permission");
  const referrer = req.headers.get("referer");

  const isNavigateFromOrigin = referrer
    ? referrer.includes(`${BASE_URL}`)
    : false;

  if (!isNavigateFromOrigin && token?.value !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: "/admin/:path*",
};

export default middleware;
