# Base development Dockerfile
# ./Dockerfile.dev
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.9.0 --activate

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package.json files from apps and packages directories
COPY package.json ./
COPY apps/docs/package.json ./apps/docs/
COPY packages/*/package.json ./packages/


# Install dependencies
RUN pnpm install

# Development image
FROM base AS development
WORKDIR /app

# Copy dependencies and source files
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY --from=deps /app/apps/docs/node_modules ./apps/docs/node_modules

# Copy source code
COPY . .

# Expose port 3000 for Next.js
EXPOSE 3000

# Start development server
CMD ["pnpm", "dev"]