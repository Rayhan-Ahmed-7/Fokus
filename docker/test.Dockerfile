FROM mcr.microsoft.com/playwright:v1.54.1-jammy

WORKDIR /app
COPY . .

RUN corepack enable && CI=true pnpm install --no-frozen-lockfile
RUN npx playwright install --with-deps

CMD ["sh", "-c", "pnpm test:coverage && pnpm test:e2e:html"]
