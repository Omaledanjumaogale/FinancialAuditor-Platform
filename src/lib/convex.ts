import { ConvexClient } from "convex/browser";
import { PUBLIC_CONVEX_URL } from "$env/static/public";
import { browser } from "$app/environment";

// Real-time WebSocket client for reactive Convex queries
// Initialize ONLY in browser to prevent Edge runtime WebSocket leaks
export const convexClient = browser ? new ConvexClient(PUBLIC_CONVEX_URL) : null;
