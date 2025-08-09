# docker/test.Dockerfile
FROM mcr.microsoft.com/playwright:v1.54.1-jammy

WORKDIR /app
COPY . .

# install project deps (pnpm)
RUN corepack enable && CI=true pnpm install --no-frozen-lockfile

# required browsers, libs
RUN npx playwright install --with-deps

# We'll use npx wait-on to wait for app readiness, then run tests and copy reports.
# Use JSON array CMD to avoid Docker "unknown instruction" parsing errors.
CMD ["sh", "-c", "npx wait-on ${BASE_URL:-http://app:4173} && pnpm test:coverage && mkdir -p /app/reports/unit && cp -r coverage /app/reports/unit && pnpm test:e2e:html && mkdir -p /app/reports/e2e && cp -r playwright-report /app/reports/e2e"]
