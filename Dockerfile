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

# Install dependencies
RUN pnpm install

# Development image
FROM base AS development
WORKDIR /app

# Copy source code
COPY . .

# Expose port 3000 for Next.js
ENV PORT 3000

# Start development server
CMD ["pnpm", "dev", "--host", "0.0.0.0"]