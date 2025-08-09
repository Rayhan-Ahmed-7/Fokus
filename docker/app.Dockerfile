# Builder stage: Debian based for easier package installs
FROM node:20-bullseye AS builder

RUN apt-get update && apt-get install -y git tini && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

RUN corepack enable && CI=true pnpm install --no-frozen-lockfile
RUN pnpm build

# Runtime stage: lighter image, only tini needed
FROM node:20-alpine

RUN apk add --no-cache tini

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 4173
CMD ["tini", "--", "pnpm", "preview", "--host", "0.0.0.0", "--port", "4173"]
