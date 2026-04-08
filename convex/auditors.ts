import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("auditors").collect();
  },
});

export const getByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("auditors")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .unique();
  },
});

export const updateVerification = mutation({
  args: { id: v.id("auditors"), isVerified: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { isVerified: args.isVerified });
  },
});
