FROM node:20-bullseye

WORKDIR /app

RUN npm install -g pnpm@10.14.0

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

CMD ["sh", "-c", "pnpm test:coverage && mkdir -p /app/reports/unit && cp -r coverage/* /app/reports/unit"]
