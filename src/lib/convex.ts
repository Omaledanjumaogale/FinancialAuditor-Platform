import { ConvexClient } from "convex/browser";
import { PUBLIC_CONVEX_URL } from "$env/static/public";

// Real-time WebSocket client for reactive Convex queries
export const convexClient = new ConvexClient(PUBLIC_CONVEX_URL);
