## ✅ Tech Stack Overview

| **Tech**                                 | **Purpose**                                            |
| ---------------------------------------- | ------------------------------------------------------ |
| **React + TypeScript**                   | Frontend UI with strong typing                         |
| **Clean Architecture (MVVM)**            | Maintainable, testable, and decoupled domain structure |
| **ShadCN UI + Tailwind CSS**             | Beautiful modern UI with component primitives          |
| **TanStack Query**                       | Declarative data fetching and caching                  |
| **TanStack Table**                       | Advanced table filtering, sorting, pagination          |
| **Redux Toolkit (optional)**             | Global app state (auth, theme, etc.)                   |
| **Vitest + RTL (React Testing Library)** | Fast and isolated unit/integration testing             |
| **Playwright**                           | End-to-end testing with headless browser automation    |
| **Husky + Lint Staged**                  | Git hooks for pre-commit checks (lint, test, format)   |
| **ESLint + Prettier**                    | Code quality, auto formatting                          |
| **Docker**                               | Containerization for local or production deployment    |
| **GitHub Actions**                       | CI: Lint, test, build, and validate PRs                |

---

## 📁 Folder Structure

```
e2e/
├── *.spec.ts
src/
├── core/
│   ├── di/
│   ├── error/
│   ├── router/
│   │    ├── routes/
│   │    │   ├── index.ts
│   │    │   └── todos.route.ts
│   │    ├── router.ts
│   │    └── provider.tsx
│   ├── store/
│   │   ├── slices/
│   │   ├── types/
│   │   ├── rootReducer.ts
│   │   └── index.ts
│   ├── theme/
│   └── utils/
├── features/
│   └── todos/
│       ├── data/
│       ├── domain/
│       │    ├── entities/
│       │    └── useCases/
│       │        └── __tests__/
│       │           └── *.test.ts
│       └── presentation/
│           ├── view/
│           └── viewModel/
├── data/
│   ├── dataSource/
│   │   ├── remote/
│   │   └── local/
│   ├── models/
│   └── repository/
├── domain/
│   ├── entities/
│   └── useCases/
├── components/ (Shared UI like buttons, cards, tables)
├── services/ (API, Notification)
└── main.tsx
```

---

## 🧪 Testing Strategy

| **Type**          | **Tool**     | **Location**                                                  |
| ----------------- | ------------ | ------------------------------------------------------------- |
| Unit Tests        | `Vitest`     | `src/features/**/domain/useCases/__tests__/*.test.ts`         |
| Integration Tests | `Vitest`     | `src/features/**/presentation/viewModel/__tests__/*.test.tsx` |
| E2E Tests         | `Playwright` | `e2e/*.spec.ts`                                               |

**Note**:

- Vitest is configured to exclude `e2e/` from its test suite
- Playwright is run separately using `pnpm test:e2e`

---

## 📜 Scripts

| **Script**     | **Description**                            |
| -------------- | ------------------------------------------ |
| `pnpm dev`     | Start Vite dev server                      |
| `pnpm build`   | Type-check and build the production bundle |
| `pnpm preview` | Preview the built app locally              |
| `pnpm lint`    | Run ESLint against the entire codebase     |
| `pnpm format`  | Auto-format code using Prettier            |
| `pnpm prepare` | Install Git hooks (via Husky)              |

---

## 🧪 Testing Commands

### 🔬 Vitest (Unit & Integration)

| Script               | Description                        |
| -------------------- | ---------------------------------- |
| `pnpm test`          | Run all unit + integration tests   |
| `pnpm test:ui`       | Run tests with Vitest UI dashboard |
| `pnpm test:watch`    | Watch mode (live feedback)         |
| `pnpm test:coverage` | Generate code coverage report      |

### 🧪 Playwright (End-to-End)

| Script                | Description                          |
| --------------------- | ------------------------------------ |
| `pnpm test:e2e`       | Run all e2e tests using Playwright   |
| `pnpm test:e2e:ui`    | Open Playwright test UI              |
| `pnpm test:e2e:debug` | Run e2e tests with debugging enabled |

> ✅ Note: E2E tests are isolated from Vitest and only run via `pnpm test:e2e*` commands.

---

Here’s a focused `README.md` section that **only includes** your:

- ✅ Vitest setup
- ✅ Husky + lint-staged setup
- ✅ Playwright setup

---

````md
## ✅ Testing & Code Quality Setup

---

### 🧪 Vitest (Unit + Integration Testing)

We use **Vitest** to write fast unit and integration tests in a JSDOM environment (ideal for testing React components and hooks).

#### 🔧 Vitest is configured in `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Allows `@/` imports from /src
    },
  },
  test: {
    exclude: ["e2e/**"], // Exclude Playwright E2E tests
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    environment: "jsdom", // Simulates browser environment
    globals: true, // Allows global test functions like `describe`, `it`
  },
});
```
````

#### 🧪 Test Scripts

| Command              | Description                      |
| -------------------- | -------------------------------- |
| `pnpm test`          | Run all unit & integration tests |
| `pnpm test:watch`    | Watch mode for development       |
| `pnpm test:ui`       | Visual test runner UI            |
| `pnpm test:coverage` | Generates a coverage report      |

---

### 🎭 Playwright (E2E Testing)

We use **Playwright** for automated browser testing of UI flows. These tests live inside the `e2e/` folder and are **not run by Vitest**.

#### ⚙️ Config: `playwright.config.ts`

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:5173",
    headless: true,
    slowMo: 1000,
    viewport: { width: 1280, height: 720 },
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
});
```

#### 🧪 E2E Test Scripts

| Command               | Description                          |
| --------------------- | ------------------------------------ |
| `pnpm test:e2e`       | Run all Playwright E2E tests         |
| `pnpm test:e2e:ui`    | Launch Playwright UI test runner     |
| `pnpm test:e2e:debug` | Debug mode with step-by-step control |

> E2E tests are excluded from `pnpm test` using the `exclude: ["e2e/**"]` setting in Vitest config.

---

### 🧼 Husky + lint-staged

To ensure clean and consistent code before every commit, we use:

- **Husky**: Git hook manager
- **lint-staged**: Runs linters only on staged files

#### ⚙️ Config: `lint-staged.config.js`

```js
export default {
  "**/*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
  "**/*.{json,md,css,html}": ["prettier --write"],
};
```

#### 🔧 Setup Steps

1. Husky is enabled via `prepare` script in `package.json`:

```json
"scripts": {
  "prepare": "husky install"
}
```

2. After running `pnpm install`, the `prepare` script sets up Git hooks.
3. You can add hooks like this:

```bash
pnpm husky add .husky/pre-commit "pnpm lint-staged"
```

Now `eslint` and `prettier` will run on only the files you’re committing — keeping commits clean and fast.

## 🚀 Coming Soon / With Future Plans
