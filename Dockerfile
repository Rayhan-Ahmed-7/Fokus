FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install && pnpm build
CMD ["pnpm", "start"]
