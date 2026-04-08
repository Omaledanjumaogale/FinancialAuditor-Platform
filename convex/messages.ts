import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getConversation = query({
  args: { userId: v.id("users"), otherId: v.id("users") },
  handler: async (ctx, args) => {
    const sent = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("senderId", args.userId).eq("receiverId", args.otherId))
      .collect();
    
    const received = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("senderId", args.otherId).eq("receiverId", args.userId))
      .collect();

    return [...sent, ...received].sort((a, b) => a.createdAt - b.createdAt);
  },
});

export const send = mutation({
  args: {
    senderId: v.id("users"),
    receiverId: v.id("users"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", {
      ...args,
      read: false,
      createdAt: Date.now(),
    });
  },
});
