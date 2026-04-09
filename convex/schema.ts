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

  notifications: defineTable({
    userId: v.id("users"),
    title: v.string(),
    message: v.string(),
    emoji: v.string(),
    type: v.union(v.literal("info"), v.literal("success"), v.literal("warning"), v.literal("danger")),
    read: v.boolean(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  payments: defineTable({
    userId: v.id("users"),
    amount: v.number(),
    currency: v.string(),
    status: v.union(v.literal("pending"), v.literal("completed"), v.literal("failed")),
    reference: v.string(),
    type: v.union(v.literal("subscription"), v.literal("audit_fee"), v.literal("marketplace_hire")),
    provider: v.union(v.literal("flutterwave"), v.literal("paystack")),
    createdAt: v.number(),
  }).index("by_user", ["userId"])
    .index("by_reference", ["reference"]),

  messages: defineTable({
    senderId: v.id("users"),
    receiverId: v.id("users"),
    content: v.string(),
    read: v.boolean(),
    createdAt: v.number(),
  }).index("by_conversation", ["senderId", "receiverId"]),

  logs: defineTable({
    userId: v.id("users"),
    action: v.string(),
    details: v.string(),
    ipAddress: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  auditors: defineTable({
    userId: v.id("users"),
    specialization: v.string(),
    experience: v.number(),
    rating: v.number(),
    isVerified: v.boolean(),
    completedAudits: v.number(),
    availability: v.boolean(),
    bio: v.string(),
    hourlyRate: v.number(),
  }).index("by_user", ["userId"]),

  serviceRequests: defineTable({
    clientId: v.id("users"),
    auditorId: v.optional(v.id("users")),
    type: v.string(),
    status: v.union(v.literal("pending"), v.literal("assigned"), v.literal("in_progress"), v.literal("completed"), v.literal("cancelled")),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("urgent")),
    budget: v.number(),
    description: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_client", ["clientId"])
    .index("by_status", ["status"]),

  transactions: defineTable({
    userId: v.id("users"),
    amount: v.number(),
    type: v.union(v.literal("credit"), v.literal("debit")),
    category: v.string(),
    description: v.string(),
    date: v.number(),
    status: v.union(v.literal("completed"), v.literal("pending"), v.literal("failed")),
  }).index("by_user", ["userId"]),
});
