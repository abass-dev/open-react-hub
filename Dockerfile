# Base development Dockerfile
# ./Dockerfile.dev
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
RUN pnpm install

# Development image
FROM base AS development
WORKDIR /app

# Copy deps
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/button/node_modules ./packages/button/node_modules
COPY --from=deps /app/packages/code-block/node_modules ./packages/code-block/node_modules
COPY --from=deps /app/apps/docs/node_modules ./apps/docs/node_modules

# Copy source code
COPY . .

# Expose port 3000 for Next.js
EXPOSE 3000

# Start development server
CMD ["pnpm", "dev"]