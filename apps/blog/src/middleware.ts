import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  API_HOSTNAMES,
  APP_HOSTNAMES,
  DEFAULT_REDIRECTS,
} from "~/constants/config";
import { env } from "~/env";
import { parse } from "~/middlewares/utils/parse";
import ApiMiddleware from "./middlewares/api";
import AppMiddleware from "./middlewares/app";
import AxiomMiddleware from "./middlewares/axiom";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (proxies for third-party services)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt, etc.)
     */
    "/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  AxiomMiddleware(req, ev);

  const { domain, key, path } = parse(req);

  // for App
  if (APP_HOSTNAMES.has(domain)) {
    return AppMiddleware(req);
  }

  // for API
  if (API_HOSTNAMES.has(domain)) {
    return ApiMiddleware(req);
  }

  // default redirects to app pages from root domain
  if (
    (domain === env.NEXT_PUBLIC_ROOT_DOMAIN || domain === "localhost:3000") &&
    DEFAULT_REDIRECTS[key as keyof typeof DEFAULT_REDIRECTS]
  ) {
    return NextResponse.redirect(
      DEFAULT_REDIRECTS[key as keyof typeof DEFAULT_REDIRECTS],
    );
  }

  // rewrite to `/main` for root domain
  if (domain === env.NEXT_PUBLIC_ROOT_DOMAIN || domain === "localhost:3000") {
    return NextResponse.rewrite(new URL(`/main${path}`, req.url));
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${domain}${path}`, req.url));
}
