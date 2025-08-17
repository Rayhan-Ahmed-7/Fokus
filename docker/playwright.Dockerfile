FROM mcr.microsoft.com/playwright:v1.54.1-jammy

WORKDIR /app

RUN npm install -g pnpm@10.14.0
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY playwright.config.ts .
COPY allurerc.mjs ./
COPY e2e ./e2e

RUN npx playwright install --with-deps

CMD ["sh", "-c", "pnpm remove:allure:report && pnpm test:e2e:html && pnpm generate:allure:report && mkdir -p /app/reports/e2e && cp -r playwright-report/* /app/reports/e2e && mkdir -p /app/reports/allure && cp -r allure-report/* /app/reports/allure"]