import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createAuthClient } from "better-auth/client";

import { parse } from "~/middlewares/utils/parse";

const client = createAuthClient();

export default async function AppMiddleware(req: NextRequest) {
  const { path, fullPath } = parse(req);

  const { data: session } = await client.getSession({
    fetchOptions: {
      headers: {
        cookie: req.headers.get("cookie") ?? "",
      },
    },
  });

  const user = session?.user;

  // if there's no user and the path isn't /login or /register, redirect to /login
  if (
    !user &&
    path !== "/login" &&
    path !== "/register" &&
    !path.startsWith("/auth/reset-password/")
  ) {
    const searchParam = fullPath ? `?next=${encodeURIComponent(fullPath)}` : "";
    return NextResponse.redirect(
      new URL(`/login${path === "/" ? "" : searchParam}`, req.url),
    );

    // if there's a user
  }

  if (user) {
    // For New Blog
    // if (path === "/new") {
    //   return NewLinkMiddleware(req, user);
    // }

    if (
      ["/", "/login", "/register", "/settings", "/upgrade"].includes(path) ||
      path.startsWith("/settings/")
    ) {
      // TODO: Add WorkspacesMiddleware
      return NextResponse.rewrite(
        new URL(`/app${path === "/" ? "" : path}`, req.url),
      );
    }
  }

  // otherwise, rewrite the path to /app
  return NextResponse.rewrite(new URL(`/app${fullPath}`, req.url));
}
