import type { NextRequest } from "next/server";
import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "~/server/auth";

export const { GET } = toNextJsHandler(auth);

export const POST = async (req: NextRequest) => {
  const res = await auth.handler(req);
  return res;
};
