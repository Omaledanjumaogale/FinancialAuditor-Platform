import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getByUid = query({
  args: { uid: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_uid", (q) => q.eq("uid", args.uid))
      .unique();
  },
});

export const store = mutation({
  args: {
    uid: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    role: v.union(v.literal("client"), v.literal("auditor"), v.literal("admin")),
    companyName: v.optional(v.string()),
    plan: v.union(v.literal("starter"), v.literal("pro"), v.literal("enterprise")),
    isVerified: v.boolean(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_uid", (q) => q.eq("uid", args.uid))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.name ?? existing.name,
        companyName: args.companyName ?? existing.companyName,
      });
      return existing._id;
    }

    return await ctx.db.insert("users", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
