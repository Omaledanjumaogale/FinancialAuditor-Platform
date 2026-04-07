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
    avatarUrl: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_uid", ["uid"]),

  documents: defineTable({
    userId: v.id("users"),
    name: v.string(),
    type: v.string(),
    url: v.string(),
    status: v.union(v.literal("pending"), v.literal("processing"), v.literal("completed"), v.literal("error")),
    extractedData: v.optional(v.any()),
    auditResultId: v.optional(v.id("audits")),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  audits: defineTable({
    userId: v.id("users"),
    documentId: v.optional(v.id("documents")),
    type: v.string(), // "firs", "cac", "internal", etc.
    findings: v.array(v.object({
      category: v.string(),
      severity: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
      message: v.string(),
      emoji: v.string(),
    })),
    score: v.number(),
    status: v.union(v.literal("pending"), v.literal("completed"), v.literal("failed")),
    completedAt: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  analytics: defineTable({
    userId: v.id("users"),
    month: v.string(), // "2024-03"
    revenue: v.number(),
    expenses: v.number(),
    profit: v.number(),
    metrics: v.any(), // detailed KPI breakdowns
  }).index("by_user_month", ["userId", "month"]),

  marketplace: defineTable({
    clientId: v.id("users"),
    title: v.string(),
    description: v.string(),
    budget: v.number(),
    currency: v.string(), // "NGN"
    status: v.union(v.literal("open"), v.literal("in_progress"), v.literal("completed")),
    auditorId: v.optional(v.id("users")),
    createdAt: v.number(),
  }).index("by_client", ["clientId"])
    .index("by_status", ["status"]),

  serviceRequests: defineTable({
    userId: v.id("users"),
    serviceType: v.string(), // "cac_registration", "firs_filing", "ngo_setup"
    status: v.union(v.literal("pending"), v.literal("processing"), v.literal("completed")),
    data: v.any(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  notifications: defineTable({
    userId: v.id("users"),
    title: v.string(),
    message: v.string(),
    emoji: v.string(),
    type: v.union(v.literal("info"), v.literal("success"), v.literal("warning"), v.literal("danger")),
    read: v.boolean(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});
