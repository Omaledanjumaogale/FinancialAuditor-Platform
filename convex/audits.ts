/**
 * Convex audits.ts — AI Audit CRUD functions
 * All audit records are stored in Convex and linked to users.
 */

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Fetch all audits for a given user (used by dashboard/audit)
export const getByUserId = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("audits")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

// Create a new audit record (called when user triggers an audit)
export const create = mutation({
  args: {
    userId: v.id("users"),
    documentId: v.optional(v.id("documents")),
    type: v.string(),
    status: v.union(v.literal("pending"), v.literal("completed"), v.literal("failed")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("audits", {
      userId: args.userId,
      documentId: args.documentId,
      type: args.type,
      status: args.status as "pending" | "completed" | "failed",
      findings: [],
      score: 0,
      createdAt: Date.now(),
    });
  },
});

// Update audit with AI results (called by server-side AI endpoint)
export const updateResults = mutation({
  args: {
    auditId: v.id("audits"),
    score: v.number(),
    status: v.union(v.literal("pending"), v.literal("completed"), v.literal("failed")),
    findings: v.array(v.object({
      category: v.string(),
      severity: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
      message: v.string(),
      emoji: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    const { auditId, ...updates } = args;
    await ctx.db.patch(auditId, {
      ...updates,
      completedAt: Date.now(),
    });
  },
});
