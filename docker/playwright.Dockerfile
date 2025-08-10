FROM mcr.microsoft.com/playwright:v1.54.1-jammy

WORKDIR /app

RUN npm install -g pnpm@10.14.0

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN npx playwright install --with-deps

CMD ["sh", "-c", "npx wait-on ${BASE_URL:-http://app:4173} && pnpm test:e2e:html && mkdir -p /app/reports/e2e && cp -r playwright-report /app/reports/e2e"]
