import type { NextRequest } from "next/server";

import { env } from "~/env";

export const parse = (req: NextRequest) => {
  const hostHeader = req.headers.get("host");
  if (!hostHeader) {
    throw new Error("Host header is missing");
  }
  let domain = hostHeader;
  // remove www. from domain and convert to lowercase
  domain = domain.replace("www.", "").toLowerCase();
  if (domain.endsWith(".vercel.app")) {
    // for local development and preview URLs
    domain = env.NEXT_PUBLIC_ROOT_DOMAIN;
  }

  const path = req.nextUrl.pathname;

  const searchParams = req.nextUrl.searchParams.toString();
  const searchParamsString = searchParams.length > 0 ? `?${searchParams}` : "";
  const fullPath = `${path}${searchParamsString}`;

  // Here, we are using decodeURIComponent to handle foreign languages like Hebrew
  const key = decodeURIComponent(path.split("/")[1] ?? ""); // key is the first part of the path
  const fullKey = decodeURIComponent(path.slice(1)); // fullKey is the full path without the first slash (to account for multi-level subpaths

  return { domain, path, fullPath, key, fullKey, searchParamsString };
};
