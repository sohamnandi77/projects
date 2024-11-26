import { env } from "~/env";

export const API_HOSTNAMES = new Set([
  `api.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
  "api.localhost:3000",
]);

export const APP_HOSTNAMES = new Set([
  `app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
  "app.localhost:3000",
]);

export const APP_DOMAIN_ROUTE =
  env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${env.NEXT_PUBLIC_ROOT_DOMAIN}`;

export const DEFAULT_REDIRECTS = {
  app: `${APP_DOMAIN_ROUTE}`,
  dashboard: `${APP_DOMAIN_ROUTE}`,
  home: `${APP_DOMAIN_ROUTE}`,
  signin: `${APP_DOMAIN_ROUTE}/login`,
  login: `${APP_DOMAIN_ROUTE}/login`,
  register: `${APP_DOMAIN_ROUTE}/register`,
  signup: `${APP_DOMAIN_ROUTE}/register`,
  settings: `${APP_DOMAIN_ROUTE}/settings`,
} as const;

// api.gotoblog.in
// app.gotoblog.in
// gotoblog.in
// xyz.vercel.app
