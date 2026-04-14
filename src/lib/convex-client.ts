import { ConvexHttpClient } from "convex/browser";
import { PUBLIC_CONVEX_URL } from "$env/static/public";

// Uses SvelteKit static env (inlined at build time) — works on Cloudflare Pages edge
export const convex = new ConvexHttpClient(PUBLIC_CONVEX_URL);
