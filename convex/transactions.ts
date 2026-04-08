import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getByUser = query({
  args: { userId: v.id("users"), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    let q = ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc");
    
    if (args.limit) {
      return await q.take(args.limit);
    }
    return await q.collect();
  },
});

export const create = mutation({
  args: {
    userId: v.id("users"),
    amount: v.number(),
    type: v.union(v.literal("credit"), v.literal("debit")),
    category: v.string(),
    description: v.string(),
    status: v.union(v.literal("completed"), v.literal("pending"), v.literal("failed")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("transactions", {
      ...args,
      date: Date.now(),
    });
  },
});
