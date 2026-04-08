import { ConvexHttpClient } from "convex/browser";

const convexUrl = import.meta.env.VITE_CONVEX_URL || "https://placeholder-url.convex.cloud";

if (!import.meta.env.VITE_CONVEX_URL && typeof window !== 'undefined') {
  console.warn("VITE_CONVEX_URL is not defined. Using placeholder URL.");
}

export const convex = new ConvexHttpClient(convexUrl);
