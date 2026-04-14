# ── Stage 1: Dependency install ──────────────────────────────────────────────
# Using slim Alpine base keeps the builder layer small.
FROM node:20-alpine AS deps
WORKDIR /app

# Copy only lock files first — maximises Docker layer cache hits on code changes
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --prefer-offline

# ── Stage 2: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Re-use installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build uses adapter-node for Docker (not adapter-cloudflare)
# Ensure NODE_ENV is set so SvelteKit bakes production optimisations
ENV NODE_ENV=production
RUN npm run build

# Prune devDependencies after build — reduces final image size
RUN npm prune --production --ignore-scripts

# ── Stage 3: Production runtime ───────────────────────────────────────────────
# Use distroless-style Alpine + only what the Node.js HTTP server needs.
# Target image size: < 50 MB
FROM node:20-alpine AS runner
WORKDIR /app

# Security: run as non-root user
RUN addgroup --system --gid 1001 sveltekit \
 && adduser  --system --uid 1001 sveltekit
USER sveltekit

ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0

# Copy only the necessary runtime artefacts
COPY --from=builder --chown=sveltekit:sveltekit /app/build          ./build
COPY --from=builder --chown=sveltekit:sveltekit /app/node_modules   ./node_modules
COPY --from=builder --chown=sveltekit:sveltekit /app/package.json   ./package.json

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1

CMD ["node", "build"]
