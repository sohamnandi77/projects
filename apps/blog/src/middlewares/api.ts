import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { parse } from "~/middlewares/utils/parse";

export default function ApiMiddleware(req: NextRequest) {
  const { fullPath } = parse(req);

  // Note: we don't have to account for paths starting with `/api`
  // since they're automatically excluded via our middleware matcher
  return NextResponse.rewrite(new URL(`/api${fullPath}`, req.url));
}
