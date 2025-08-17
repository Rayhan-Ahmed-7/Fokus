# Stage 1: builder (Debian) - build the app
FROM node:20-bullseye AS builder

RUN apt-get update && apt-get install -y git tini && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@10.14.0 --activate
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Stage 2: runtime (Debian) - ensure pnpm is available at runtime
FROM node:20-bullseye AS runtime

# Enable corepack + pnpm in the runtime so `pnpm preview` exists
RUN corepack enable && corepack prepare pnpm@10.14.0 --activate
RUN apt-get update && apt-get install -y tini && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/vite.config.ts ./vite.config.ts


EXPOSE 4173

CMD ["tini", "--", "pnpm", "preview", "--host", "0.0.0.0", "--port", "4173"]
