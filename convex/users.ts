import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserByUid = query({
  args: { uid: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_uid", (q) => q.eq("uid", args.uid))
      .unique();
  },
});

export const createUser = mutation({
  args: {
    uid: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    role: v.union(v.literal("client"), v.literal("auditor"), v.literal("admin")),
    plan: v.union(v.literal("starter"), v.literal("pro"), v.literal("enterprise")),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_uid", (q) => q.eq("uid", args.uid))
      .unique();
    
    if (existing) return existing._id;

    return await ctx.db.insert("users", {
      uid: args.uid,
      email: args.email,
      name: args.name,
      role: args.role,
      plan: args.plan,
      isVerified: false,
    });
  },
});
