# Production Dockerfile for docs
# ./apps/docs/Dockerfile
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.9.0 --activate

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy configuration files
COPY package.json pnpm-workspace.yaml ./
COPY packages/button/package.json ./packages/button/package.json
COPY packages/code-block/package.json ./packages/code-block/package.json
COPY apps/docs/package.json ./apps/docs/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build packages first
RUN pnpm --filter "@open-react-hub/*" build

# Then build the docs
RUN pnpm --filter docs build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built assets
COPY --from=builder /app/apps/docs/public ./apps/docs/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/docs/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/docs/.next/static ./apps/docs/.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "apps/docs/server.js"]