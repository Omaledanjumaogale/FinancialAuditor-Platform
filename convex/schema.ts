import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    uid: v.string(), // Firebase UID
    email: v.string(),
    name: v.optional(v.string()),
    role: v.union(v.literal("client"), v.literal("auditor"), v.literal("admin")),
    companyName: v.optional(v.string()),
    plan: v.union(v.literal("starter"), v.literal("pro"), v.literal("enterprise")),
    isVerified: v.boolean(),
  }).index("by_uid", ["uid"]),

  documents: defineTable({
    userId: v.id("users"),
    name: v.string(),
    type: v.string(),
    url: v.string(),
    status: v.union(v.literal("pending"), v.literal("processing"), v.literal("completed"), v.literal("error")),
    extractedData: v.optional(v.any()),
    auditResult: v.optional(v.id("audits")),
  }).index("by_user", ["userId"]),

  audits: defineTable({
    userId: v.id("users"),
    documentId: v.optional(v.id("documents")),
    type: v.string(),
    findings: v.array(v.object({
      category: v.string(),
      severity: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
      message: v.string(),
    })),
    score: v.number(),
    status: v.string(),
  }).index("by_user", ["userId"]),

  analytics: defineTable({
    userId: v.id("users"),
    month: v.string(),
    revenue: v.number(),
    expenses: v.number(),
    profit: v.number(),
    metrics: v.any(),
  }).index("by_user_month", ["userId", "month"]),

  marketplace: defineTable({
    clientId: v.id("users"),
    title: v.string(),
    description: v.string(),
    budget: v.number(),
    status: v.union(v.literal("open"), v.literal("in_progress"), v.literal("completed")),
    auditorId: v.optional(v.id("users")),
  }).index("by_client", ["clientId"]),

  serviceRequests: defineTable({
    userId: v.id("users"),
    serviceType: v.string(), // "cac", "firs", "ngo", etc.
    status: v.string(),
    data: v.any(),
  }).index("by_user", ["userId"]),
});
