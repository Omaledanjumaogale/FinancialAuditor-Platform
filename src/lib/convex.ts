import { ConvexClient } from "convex/browser";
import { env } from "$env/dynamic/public";

export const convexClient = new ConvexClient(env.PUBLIC_CONVEX_URL as string);
