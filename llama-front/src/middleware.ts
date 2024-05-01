import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";

export default withMiddlewareAuthRequired({
  returnTo: "/",
  async middleware(req) {
    return NextResponse.next();
  },
});

export const config = {
  matcher: "/dashboard/:path*",
};
