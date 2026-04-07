import { query } from "./_generated/server";
import { v } from "convex/values";

export const getLatest = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("analytics")
      .withIndex("by_user_month", (q) => q.eq("userId", args.userId))
      .order("desc")
      .first();
  },
});

export const getHistory = query({
  args: { userId: v.id("users"), limit: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("analytics")
      .withIndex("by_user_month", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(args.limit);
  },
});
