FROM node:20-alpine

# Install git for GitHub packages like shadcn/ui
RUN apk add --no-cache git

WORKDIR /app
COPY . .

RUN corepack enable && CI=true pnpm install --no-frozen-lockfile
RUN pnpm build

CMD ["pnpm", "preview", "--host"]
